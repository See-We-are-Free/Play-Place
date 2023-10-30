package kr.co.playplace.entity.location;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QState is a Querydsl query type for State
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QState extends EntityPathBase<State> {

    private static final long serialVersionUID = 928401773L;

    public static final QState state = new QState("state");

    public final NumberPath<Integer> code = createNumber("code", Integer.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath name = createString("name");

    public QState(String variable) {
        super(State.class, forVariable(variable));
    }

    public QState(Path<? extends State> path) {
        super(path.getType(), path.getMetadata());
    }

    public QState(PathMetadata metadata) {
        super(State.class, metadata);
    }

}

