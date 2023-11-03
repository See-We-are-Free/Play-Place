package kr.co.playplace.entity.user;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserLandmarkSong is a Querydsl query type for UserLandmarkSong
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserLandmarkSong extends EntityPathBase<UserLandmarkSong> {

    private static final long serialVersionUID = 1016220070L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserLandmarkSong userLandmarkSong = new QUserLandmarkSong("userLandmarkSong");

    public final kr.co.playplace.entity.QTimeBaseEntity _super = new kr.co.playplace.entity.QTimeBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final kr.co.playplace.entity.song.QSong song;

    public final QUserLandmarkGroup userLandmarkGroup;

    public QUserLandmarkSong(String variable) {
        this(UserLandmarkSong.class, forVariable(variable), INITS);
    }

    public QUserLandmarkSong(Path<? extends UserLandmarkSong> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserLandmarkSong(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserLandmarkSong(PathMetadata metadata, PathInits inits) {
        this(UserLandmarkSong.class, metadata, inits);
    }

    public QUserLandmarkSong(Class<? extends UserLandmarkSong> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.song = inits.isInitialized("song") ? new kr.co.playplace.entity.song.QSong(forProperty("song")) : null;
        this.userLandmarkGroup = inits.isInitialized("userLandmarkGroup") ? new QUserLandmarkGroup(forProperty("userLandmarkGroup"), inits.get("userLandmarkGroup")) : null;
    }

}

