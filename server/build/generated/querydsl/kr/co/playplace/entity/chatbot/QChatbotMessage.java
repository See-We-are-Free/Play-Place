package kr.co.playplace.entity.chatbot;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChatbotMessage is a Querydsl query type for ChatbotMessage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChatbotMessage extends EntityPathBase<ChatbotMessage> {

    private static final long serialVersionUID = 1757498764L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChatbotMessage chatbotMessage = new QChatbotMessage("chatbotMessage");

    public final kr.co.playplace.entity.QTimeBaseEntity _super = new kr.co.playplace.entity.QTimeBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final kr.co.playplace.entity.user.QUsers user;

    public QChatbotMessage(String variable) {
        this(ChatbotMessage.class, forVariable(variable), INITS);
    }

    public QChatbotMessage(Path<? extends ChatbotMessage> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChatbotMessage(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChatbotMessage(PathMetadata metadata, PathInits inits) {
        this(ChatbotMessage.class, metadata, inits);
    }

    public QChatbotMessage(Class<? extends ChatbotMessage> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new kr.co.playplace.entity.user.QUsers(forProperty("user")) : null;
    }

}

