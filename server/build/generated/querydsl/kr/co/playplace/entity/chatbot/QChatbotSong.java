package kr.co.playplace.entity.chatbot;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChatbotSong is a Querydsl query type for ChatbotSong
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChatbotSong extends EntityPathBase<ChatbotSong> {

    private static final long serialVersionUID = -965403216L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChatbotSong chatbotSong = new QChatbotSong("chatbotSong");

    public final kr.co.playplace.entity.QTimeBaseEntity _super = new kr.co.playplace.entity.QTimeBaseEntity(this);

    public final QChatbotMessage chatbotMessage;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final kr.co.playplace.entity.song.QSong song;

    public QChatbotSong(String variable) {
        this(ChatbotSong.class, forVariable(variable), INITS);
    }

    public QChatbotSong(Path<? extends ChatbotSong> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChatbotSong(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChatbotSong(PathMetadata metadata, PathInits inits) {
        this(ChatbotSong.class, metadata, inits);
    }

    public QChatbotSong(Class<? extends ChatbotSong> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.chatbotMessage = inits.isInitialized("chatbotMessage") ? new QChatbotMessage(forProperty("chatbotMessage"), inits.get("chatbotMessage")) : null;
        this.song = inits.isInitialized("song") ? new kr.co.playplace.entity.song.QSong(forProperty("song")) : null;
    }

}

