package kr.co.playplace;

import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;

public class ShakeDetector implements SensorEventListener {
    // 중력, 중력가속도를 기준으로 진동, 움직임을 측정
    // 흔들림 감지할 때 기준이 되는 힘
    private static final float SHAKE_THRESHOLD_GRAVITY = 2.7F;
    // 흔들림 감지할때 최소 0.5초 기준으로 측정
    private static final int SHAKE_SLOP_TIME_MS = 500;
    // 흔드는 횟수는 3초마다 초기화
    private static final int SHAKE_COUNT_RESET_TIME_MS = 3000;
    // listener
    private OhShakeListener mListener;
    // 시간 기록용
    private long mShakeTimestamp;
    // 횟수
    private int mShakeCount;
    // listener setting
    public void setOnShakeListener(OhShakeListener listener) {
        this.mListener = listener;
    }
    // listener interface
    public interface OhShakeListener {
        public void onShake(int count);
    }
    // 정확도가 변할때 사용하지 않음
    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy){
    }

    @Override
    public void onSensorChanged(SensorEvent event){
        if (mListener != null) {
            // x,y,z 축의 값
            float x = event.values[0];
            float y = event.values[1];
            float z = event.values[2];
            // 중력 가속도 값으로 나눈 값
            float gX = x / SensorManager.GRAVITY_EARTH;
            float gY = y / SensorManager.GRAVITY_EARTH;
            float gZ = z / SensorManager.GRAVITY_EARTH;

            // gForce는 중력가속도를 포함하는 물체가 받는 힘
            // 1일때는 평소에 받는 중력(정지)
            // 1 이하 일 때 (아래로 떨어지며 힘을 덜 받을때)
            // 1 이상 일 때 (위로 올라가면서 힘을 더 받을때)
            // 단순히 힘의 크기를 계산하기 때문에 피타고라스로 구한다.
            float gForce = (float)Math.sqrt(gX * gX + gY * gY + gZ * gZ);
            // 진동을 감지할 때
            // gForce가 기준치 이상일 때
            if (gForce > SHAKE_THRESHOLD_GRAVITY) {
                long now = System.currentTimeMillis();
                // 진동 간격이 너무 짧을 때는 무시
                if (mShakeTimestamp + SHAKE_COUNT_RESET_TIME_MS > now) {
                    return;
                }

                // 3초 이상 걸렸을 때 reset
                if (mShakeTimestamp + SHAKE_COUNT_RESET_TIME_MS < now) {
                    mShakeCount = 0;
                }

                mShakeTimestamp = now;
                mShakeCount++;
                // 흔들렸을 때 행동을 설정
                mListener.onShake(mShakeCount);
            }
        }
    }
}
