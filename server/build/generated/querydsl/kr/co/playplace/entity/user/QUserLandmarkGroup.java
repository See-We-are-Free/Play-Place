package kr.co.playplace.entity.user;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserLandmarkGroup is a Querydsl query type for UserLandmarkGroup
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserLandmarkGroup extends EntityPathBase<UserLandmarkGroup> {

    private static final long serialVersionUID = 1427059726L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserLandmarkGroup userLandmarkGroup = new QUserLandmarkGroup("userLandmarkGroup");

    public final kr.co.playplace.entity.QTimeBaseEntity _super = new kr.co.playplace.entity.QTimeBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final kr.co.playplace.entity.landmark.QLandmark landmark;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final QUsers user;

    public QUserLandmarkGroup(String variable) {
        this(UserLandmarkGroup.class, forVariable(variable), INITS);
    }

    public QUserLandmarkGroup(Path<? extends UserLandmarkGroup> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserLandmarkGroup(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserLandmarkGroup(PathMetadata metadata, PathInits inits) {
        this(UserLandmarkGroup.class, metadata, inits);
    }

    public QUserLandmarkGroup(Class<? extends UserLandmarkGroup> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.landmark = inits.isInitialized("landmark") ? new kr.co.playplace.entity.landmark.QLandmark(forProperty("landmark")) : null;
        this.user = inits.isInitialized("user") ? new QUsers(forProperty("user")) : null;
    }

}

