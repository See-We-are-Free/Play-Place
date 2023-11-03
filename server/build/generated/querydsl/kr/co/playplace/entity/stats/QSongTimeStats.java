package kr.co.playplace.entity.stats;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSongTimeStats is a Querydsl query type for SongTimeStats
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSongTimeStats extends EntityPathBase<SongTimeStats> {

    private static final long serialVersionUID = -294210119L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSongTimeStats songTimeStats = new QSongTimeStats("songTimeStats");

    public final kr.co.playplace.entity.QTimeBaseEntity _super = new kr.co.playplace.entity.QTimeBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final kr.co.playplace.entity.song.QSong song;

    public QSongTimeStats(String variable) {
        this(SongTimeStats.class, forVariable(variable), INITS);
    }

    public QSongTimeStats(Path<? extends SongTimeStats> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSongTimeStats(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSongTimeStats(PathMetadata metadata, PathInits inits) {
        this(SongTimeStats.class, metadata, inits);
    }

    public QSongTimeStats(Class<? extends SongTimeStats> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.song = inits.isInitialized("song") ? new kr.co.playplace.entity.song.QSong(forProperty("song")) : null;
    }

}

