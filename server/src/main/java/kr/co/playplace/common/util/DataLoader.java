package kr.co.playplace.common.util;

import com.opencsv.bean.ColumnPositionMappingStrategy;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import kr.co.playplace.entity.location.City;
import kr.co.playplace.entity.location.State;
import kr.co.playplace.repository.CityJDBCRepository;
import kr.co.playplace.repository.StateJDBCRepository;
import kr.co.playplace.repository.VillageJDBCRepository;
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
import java.util.List;

@RequiredArgsConstructor
@Component
@Slf4j
public class DataLoader {

    private final StateJDBCRepository stateJDBCRepository;
    private final CityJDBCRepository cityJDBCRepository;
    private final VillageJDBCRepository villageJDBCRepository;

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
}
