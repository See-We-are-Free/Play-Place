package kr.co.playplace.common.util.location;

import com.opencsv.bean.ColumnPositionMappingStrategy;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import kr.co.playplace.entity.Timezone;
import kr.co.playplace.entity.Weather;
import kr.co.playplace.entity.location.State;
import kr.co.playplace.entity.location.Village;
import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.song.SongHistory;
import kr.co.playplace.entity.user.Users;
import kr.co.playplace.repository.location.CityJDBCRepository;
import kr.co.playplace.repository.location.StateJDBCRepository;
import kr.co.playplace.repository.location.VillageJDBCRepository;
import kr.co.playplace.repository.location.VillageRepository;
import kr.co.playplace.repository.song.SongHistoryRepository;
import kr.co.playplace.repository.song.SongRepository;
import kr.co.playplace.repository.user.UserRepository;
import kr.co.playplace.service.song.SongService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@RequiredArgsConstructor
@Component
@Slf4j
public class DataLoader {

    private final StateJDBCRepository stateJDBCRepository;
    private final CityJDBCRepository cityJDBCRepository;
    private final VillageJDBCRepository villageJDBCRepository;
    private final SongRepository songRepository;
    private final SongHistoryRepository songHistoryRepository;
    private final SongService songService;

    @Bean
    public CommandLineRunner stateLoad() {
        return (args) -> {
            boolean exists = stateJDBCRepository.isExistsData();
            ClassPathResource resource = new ClassPathResource("location/state.csv");

            // InputStream을 사용하여 파일을 읽음
            try (InputStream inputStream = resource.getInputStream();
                 Reader reader = new InputStreamReader(inputStream, StandardCharsets.UTF_8)) {
                if (!exists) {
                    List<State> states = readStatesFromCSV(reader);
                    stateJDBCRepository.bulkInsert(states);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        };
    }

    public List<State> readStatesFromCSV(Reader reader) throws IOException {
        ColumnPositionMappingStrategy<State> strategy = new ColumnPositionMappingStrategy<>();
        strategy.setType(State.class);
        String[] memberFieldsToBindTo = { "id", "code", "name" };
        strategy.setColumnMapping(memberFieldsToBindTo);

        CsvToBean<State> csvToBean = new CsvToBeanBuilder<State>(reader)
                .withMappingStrategy(strategy)
                .withSkipLines(1)
                .withType(State.class)
                .build();

        return csvToBean.parse();
    }

    @Bean
    public CommandLineRunner cityLoad() {
        return (args) -> {
            boolean exists = cityJDBCRepository.isExistsData();
            ClassPathResource resource = new ClassPathResource("location/city.csv");

            // InputStream을 사용하여 파일을 읽음
            try (InputStream inputStream = resource.getInputStream();
                 Reader reader = new InputStreamReader(inputStream, StandardCharsets.UTF_8)) {
                if (!exists) {
                    List<CityCsvDto> cities = readCitiesFromCSV(reader);
                    cityJDBCRepository.bulkInsert(cities);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        };
    }

    public List<CityCsvDto> readCitiesFromCSV(Reader reader) throws IOException {
        ColumnPositionMappingStrategy<CityCsvDto> strategy = new ColumnPositionMappingStrategy<>();
        strategy.setType(CityCsvDto.class);
        String[] memberFieldsToBindTo = { "id", "name", "code", "stateId" };
        strategy.setColumnMapping(memberFieldsToBindTo);

        CsvToBean<CityCsvDto> csvToBean = new CsvToBeanBuilder<CityCsvDto>(reader)
                .withMappingStrategy(strategy)
                .withSkipLines(1)
                .withType(CityCsvDto.class)
                .build();

        return csvToBean.parse();
    }

    @Bean
    public CommandLineRunner villageLoad() {
        return (args) -> {
            boolean exists = villageJDBCRepository.isExistsData();
            ClassPathResource resource = new ClassPathResource("location/village.csv");

            // InputStream을 사용하여 파일을 읽음
            try (InputStream inputStream = resource.getInputStream();
                 Reader reader = new InputStreamReader(inputStream, StandardCharsets.UTF_8)) {
                if (!exists) {
                    List<VillageCsvDto> villages = readVillagesFromCSV(reader);
                    villageJDBCRepository.bulkInsert(villages);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        };
    }

    public List<VillageCsvDto> readVillagesFromCSV(Reader reader) throws IOException {
        ColumnPositionMappingStrategy<VillageCsvDto> strategy = new ColumnPositionMappingStrategy<>();
        strategy.setType(VillageCsvDto.class);
        String[] memberFieldsToBindTo = { "id", "code", "name", "cityId" };
        strategy.setColumnMapping(memberFieldsToBindTo);

        CsvToBean<VillageCsvDto> csvToBean = new CsvToBeanBuilder<VillageCsvDto>(reader)
                .withMappingStrategy(strategy)
                .withSkipLines(1)
                .withType(VillageCsvDto.class)
                .build();

        return csvToBean.parse();
    }

    public void createRandomSongHistory(Users user, Village village) {
        Random rand = new Random();

        for(int i = 0; i < 10; i++) {
            long songId = 1 + rand.nextInt(39);
            int weatherType = rand.nextInt(4);
            int timeZoneType = rand.nextInt(4);

            Optional<Song> song = songRepository.findById(songId);

            Weather weather = Weather.values()[weatherType];
            Timezone timezone = Timezone.values()[timeZoneType];

            SongHistory songHistory = SongHistory.builder()
                    .user(user)
                    .song(song.get())
                    .village(village)
                    .weather(weather)
                    .timezone(timezone)
                    .build();

            songHistoryRepository.save(songHistory);
        }
    }

    @Bean
    public CommandLineRunner SongHistoryDataLoad(UserRepository userRepository, VillageRepository villageRepository) {
        return args -> {
            long count = userRepository.count();
            if(count == 0) {
                Users user = new Users("dump", 1, "playplace@gmail.com", 0, 0, 0, "ROLE_ADMIN" );
                userRepository.save(user);

                for(int i = 1; i <= 3586; i++) {
                    Optional<Village> village = villageRepository.findById(i);
                    createRandomSongHistory(user, village.get());
                }

                songService.getAreaStatistics();
                songService.getTimezoneStatistics();
                songService.getWeatherStatistics();
            }
        };
    }
}
