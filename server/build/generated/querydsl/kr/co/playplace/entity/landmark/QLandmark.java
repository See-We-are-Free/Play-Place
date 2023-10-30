package kr.co.playplace.entity.landmark;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QLandmark is a Querydsl query type for Landmark
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLandmark extends EntityPathBase<Landmark> {

    private static final long serialVersionUID = 1041948857L;

    public static final QLandmark landmark = new QLandmark("landmark");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public QLandmark(String variable) {
        super(Landmark.class, forVariable(variable));
    }

    public QLandmark(Path<? extends Landmark> path) {
        super(path.getType(), path.getMetadata());
    }

    public QLandmark(PathMetadata metadata) {
        super(Landmark.class, metadata);
    }

}

