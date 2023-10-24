package kr.co.playplace.common.util;

import com.opencsv.bean.ColumnPositionMappingStrategy;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import kr.co.playplace.entity.location.State;
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
    private final VillageJDBCRepository villageJDBCRepository;

//    @Bean
//    public CommandLineRunner stateLoad() {
//        return (args) -> {
//            boolean exists = stateJDBCRepository.isExistsData();
//            ClassPathResource resource = new ClassPathResource("location/state.csv");
//
//            // InputStream을 사용하여 파일을 읽음
//            try (InputStream inputStream = resource.getInputStream();
//                 Reader reader = new InputStreamReader(inputStream, StandardCharsets.UTF_8)) {
//                if (!exists) {
//                    List<State> states = readStatesFromCSV(reader);
//                    stateJDBCRepository.bulkInsert(states);
//                }
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        };
//    }
//
//    public List<State> readStatesFromCSV(Reader reader) throws IOException {
//        ColumnPositionMappingStrategy<State> strategy = new ColumnPositionMappingStrategy<>();
//        strategy.setType(State.class);
//        String[] memberFieldsToBindTo = { "state_id", "code", "name" };
//        strategy.setColumnMapping(memberFieldsToBindTo);
//
//        CsvToBean<State> csvToBean = new CsvToBeanBuilder<State>(reader)
//                .withMappingStrategy(strategy)
//                .withSkipLines(1)
//                .withType(State.class)
//                .build();
//
//        return csvToBean.parse();
//    }

//    @Bean
//    public CommandLineRunner villageLoad() {
//        return (args) -> {
//            boolean exists = villageJDBCRepository.isExistsData();
//            ClassPathResource resource = new ClassPathResource("location/village.csv");
//
//            // InputStream을 사용하여 파일을 읽음
//            try (InputStream inputStream = resource.getInputStream();
//                 Reader reader = new InputStreamReader(inputStream, StandardCharsets.UTF_8)) {
//                if (!exists) {
//                    List<Village> villages = readVillagesFromCSV(reader);
//                    villageJDBCRepository.bulkInsert(villages);
//                }
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        };
//    }
//
//    public List<Village> readVillagesFromCSV(Reader reader) throws IOException {
//        ColumnPositionMappingStrategy<Village> strategy = new ColumnPositionMappingStrategy<>();
//        strategy.setType(Village.class);
//        String[] memberFieldsToBindTo = { "name", "code" };
//        strategy.setColumnMapping(memberFieldsToBindTo);
//
//        CsvToBean<Village> csvToBean = new CsvToBeanBuilder<Village>(reader)
//                .withMappingStrategy(strategy)
//                .withSkipLines(1)
//                .withType(Village.class)
//                .build();
//
//        return csvToBean.parse();
//    }

//    @Bean
//    public CommandLineRunner foodDataLoad() {
//        return (args) -> {
//            boolean exists = foodSearchRepository.isExistsData();
//            ClassPathResource resource = new ClassPathResource("food/foody_food.csv");
//
//            try (InputStream inputStream = resource.getInputStream();
//                 Reader reader = new InputStreamReader(inputStream, StandardCharsets.UTF_8)) {
//                if(!exists) {
//                    List<FoodSearch> foodSearchList = readFoodsFromCSV(reader);
//                    foodSearchRepository.bulkInsert(foodSearchList);
//                }
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        };
//    }
//
//    public List<FoodSearch> readFoodsFromCSV(Reader reader) {
//        ColumnPositionMappingStrategy<FoodSearch> strategy = new ColumnPositionMappingStrategy<>();
//        strategy.setType(FoodSearch.class);
//        String[] memberFieldsToBindTo = {
//                "id", "name", "energy", "carbohydrates",
//                "protein", "dietaryFiber", "calcium", "sodium", "iron", "fats", "vitaminA", "vitaminC"
//        };
//        strategy.setColumnMapping(memberFieldsToBindTo);
//
//        CsvToBean<FoodSearch> csvToBean = new CsvToBeanBuilder<FoodSearch>(reader)
//                .withMappingStrategy(strategy)
//                .withSkipLines(1)
//                .withType(FoodSearch.class)
//                .build();
//
//        return csvToBean.parse();
//    }
//
//    @Bean
//    public CommandLineRunner ingredientDataLoad() {
//        return (args) -> {
//            boolean exits = ingredientJDBCRepository.isExistsData();
//            ClassPathResource resource = new ClassPathResource("ingredient/foody_ingredient.csv");
//
//            try (InputStream inputStream = resource.getInputStream();
//                 Reader reader = new InputStreamReader(inputStream, StandardCharsets.UTF_8)) {
//                if(!exits) {
//                    List<IngredientCSV> ingredients = readIngredientsFromCSV(reader);
//                    ingredientJDBCRepository.bulkInsert(ingredients);
//                }
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        };
//    }
//
//    public List<IngredientCSV> readIngredientsFromCSV(Reader reader) throws IOException {
//        ColumnPositionMappingStrategy<IngredientCSV> strategy = new ColumnPositionMappingStrategy<>();
//        strategy.setType(IngredientCSV.class);
//        String[] memberFieldsToBindTo = {
//                "ingredientId","ingredientName","ingredientType", "ingredientCategoryId", "iconImg"
//        };
//        strategy.setColumnMapping(memberFieldsToBindTo);
//
//        CsvToBean<IngredientCSV> csvToBean = new CsvToBeanBuilder<IngredientCSV>(reader)
//                .withMappingStrategy(strategy)
//                .withSkipLines(1)
//                .withType(IngredientCSV.class)
//                .build();
//
//        return csvToBean.parse();
//    }
}
