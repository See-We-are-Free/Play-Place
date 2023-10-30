package kr.co.playplace.entity.song;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSongHistory is a Querydsl query type for SongHistory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSongHistory extends EntityPathBase<SongHistory> {

    private static final long serialVersionUID = 347925883L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSongHistory songHistory = new QSongHistory("songHistory");

    public final kr.co.playplace.entity.QTimeBaseEntity _super = new kr.co.playplace.entity.QTimeBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final QSong song;

    public final kr.co.playplace.entity.user.QUsers user;

    public final kr.co.playplace.entity.location.QVillage village;

    public QSongHistory(String variable) {
        this(SongHistory.class, forVariable(variable), INITS);
    }

    public QSongHistory(Path<? extends SongHistory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSongHistory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSongHistory(PathMetadata metadata, PathInits inits) {
        this(SongHistory.class, metadata, inits);
    }

    public QSongHistory(Class<? extends SongHistory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.song = inits.isInitialized("song") ? new QSong(forProperty("song")) : null;
        this.user = inits.isInitialized("user") ? new kr.co.playplace.entity.user.QUsers(forProperty("user")) : null;
        this.village = inits.isInitialized("village") ? new kr.co.playplace.entity.location.QVillage(forProperty("village"), inits.get("village")) : null;
    }

}

