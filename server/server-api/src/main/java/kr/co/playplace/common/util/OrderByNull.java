package kr.co.playplace.common.util;

import com.querydsl.core.types.NullExpression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
public class OrderByNull extends OrderSpecifier { // QueryDsl에서는 order by null 구문을 지원하지 않아서 직접 만들어서 사용

    public static final OrderByNull DEFAULT = new OrderByNull();

    private OrderByNull() {
        super(Order.ASC, NullExpression.DEFAULT, NullHandling.Default);
    }

}
