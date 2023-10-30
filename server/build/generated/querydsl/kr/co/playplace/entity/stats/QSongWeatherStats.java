package kr.co.playplace.entity.stats;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSongWeatherStats is a Querydsl query type for SongWeatherStats
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSongWeatherStats extends EntityPathBase<SongWeatherStats> {

    private static final long serialVersionUID = -811131964L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSongWeatherStats songWeatherStats = new QSongWeatherStats("songWeatherStats");

    public final kr.co.playplace.entity.QTimeBaseEntity _super = new kr.co.playplace.entity.QTimeBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final kr.co.playplace.entity.song.QSong song;

    public QSongWeatherStats(String variable) {
        this(SongWeatherStats.class, forVariable(variable), INITS);
    }

    public QSongWeatherStats(Path<? extends SongWeatherStats> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSongWeatherStats(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSongWeatherStats(PathMetadata metadata, PathInits inits) {
        this(SongWeatherStats.class, metadata, inits);
    }

    public QSongWeatherStats(Class<? extends SongWeatherStats> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.song = inits.isInitialized("song") ? new kr.co.playplace.entity.song.QSong(forProperty("song")) : null;
    }

}

