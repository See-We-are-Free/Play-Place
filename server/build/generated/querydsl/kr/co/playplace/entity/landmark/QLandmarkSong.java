package kr.co.playplace.entity.landmark;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLandmarkSong is a Querydsl query type for LandmarkSong
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLandmarkSong extends EntityPathBase<LandmarkSong> {

    private static final long serialVersionUID = 83310L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLandmarkSong landmarkSong = new QLandmarkSong("landmarkSong");

    public final kr.co.playplace.entity.QTimeBaseEntity _super = new kr.co.playplace.entity.QTimeBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QLandmark landmark;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final kr.co.playplace.entity.song.QSong song;

    public final kr.co.playplace.entity.user.QUsers user;

    public QLandmarkSong(String variable) {
        this(LandmarkSong.class, forVariable(variable), INITS);
    }

    public QLandmarkSong(Path<? extends LandmarkSong> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLandmarkSong(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLandmarkSong(PathMetadata metadata, PathInits inits) {
        this(LandmarkSong.class, metadata, inits);
    }

    public QLandmarkSong(Class<? extends LandmarkSong> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.landmark = inits.isInitialized("landmark") ? new QLandmark(forProperty("landmark")) : null;
        this.song = inits.isInitialized("song") ? new kr.co.playplace.entity.song.QSong(forProperty("song")) : null;
        this.user = inits.isInitialized("user") ? new kr.co.playplace.entity.user.QUsers(forProperty("user")) : null;
    }

}

