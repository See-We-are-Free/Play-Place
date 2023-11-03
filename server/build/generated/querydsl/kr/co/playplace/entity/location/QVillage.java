package kr.co.playplace.entity.location;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QVillage is a Querydsl query type for Village
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QVillage extends EntityPathBase<Village> {

    private static final long serialVersionUID = 1198416520L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QVillage village = new QVillage("village");

    public final QCity city;

    public final NumberPath<Integer> code = createNumber("code", Integer.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath name = createString("name");

    public QVillage(String variable) {
        this(Village.class, forVariable(variable), INITS);
    }

    public QVillage(Path<? extends Village> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QVillage(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QVillage(PathMetadata metadata, PathInits inits) {
        this(Village.class, metadata, inits);
    }

    public QVillage(Class<? extends Village> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.city = inits.isInitialized("city") ? new QCity(forProperty("city"), inits.get("city")) : null;
    }

}

