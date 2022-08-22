from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import pandas as pd
import numpy as np
from datetime import date, datetime
from PIL import Image
import urllib.request
from io import BytesIO
import joblib

# 머신러닝 모델
from sklearn.cluster import KMeans
from sklearn.preprocessing import OneHotEncoder, RobustScaler
from pickle import load
from tensorflow import keras


def change(x):
    tmp = '0'
    if x=='-':
        pass
    elif x.find('약') > 0: # '약'이 있는것 체크
        idx = x.find('약')
        tmp = x[idx+1:-2]  # '원' 제거
    else:
        tmp =  x[1:-2] # '원' 제거
    return tmp.replace(',','')


app = Flask(__name__)
CORS(app)
@app.route('/test', methods=['POST'])

def home():
    # if request.method == "POST":
    # 1. 클라이언트로부터 예측에 필요한 데이터 획득
    params = request.get_json()
    testdf = pd.DataFrame(params, index = [0]) # brand / ReleaseDate / Woman / ReleasePrice / Collab / ImageURL
    # print(testdf['Brand'])
    # print(testdf['ReleaseDate'])
    # print(testdf['Woman'])
    # print(testdf['ReleasePrice'])
    # print(testdf['Collab'])
    # print(testdf['ImageURL'])
    
    # 2. 전처리
    ##### 1) brand
    testdf['brand'] = testdf['brand'][0][1:-1]
    ##### 2) ReleaseDate
    now = datetime(2022, 8, 18)
    a = datetime.strptime(testdf['ReleaseDate'][0][1:-1], '%y/%m/%d')
    diff = now - a
    testdf['ReleaseDate'] = diff.days
    ##### 3) Woman
    # pass
    ##### 4) ReleasePrice
    testdf['ReleasePrice'] = testdf['ReleasePrice'].apply(change).astype(int)
    ##### 5) Collab
    # pass
    ###### 6) ImageURL
    KMEANS = joblib.load('../SD_KMeans_model.pkl') # 분류기 모델 load
    url = testdf['ImageURL'][0]
    req = urllib.request.Request(url, headers = {"User-Agent" : "Mozilla/5.0"})
    res = urllib.request.urlopen(req).read()
    img = Image.open(BytesIO(res)) # url을 통해 불러온 이미지를 객체로 저장
    backgroundImage = Image.open('./white.png')
    image = Image.alpha_composite(backgroundImage, img) # 신발 이미지의 배경을 하얗게
    if image.mode != 'RGB' :
        image = image.convert('RGB')
    image = image.resize((100, 100)) # 이미지의 타입을 RGB로 변경하고, 사이즈를 작게 조절
    img_array = np.array(image) # 이미지를 array 형태로 변환
    imgArray2D = img_array.reshape(-1, 100 * 100 * 3)
    prediction = KMEANS.predict(imgArray2D)
    testdf['Cluster'] = prediction
    testdf = testdf.drop('ImageURL', axis = 1)

    test2 = testdf



    # 수정된 데이터 출력
    print('-' * 25, '수정된 데이터', '-' * 25)
    print(testdf)
    print('-' * 65)


    # 더미변수 처리 (ANN)
        # One-hot Encoder 로드
    brandEncoder = joblib.load('../brandEncoder.joblib')
    brandEncoded = brandEncoder.transform(testdf['brand'].values.reshape(-1,1))
    print('브랜드 인코딩 ok')

    ClusterEncoder = joblib.load('../ClusterEncoder.joblib')
    ClusterEncoded = ClusterEncoder.transform(testdf['Cluster'].values.reshape(-1,1))
    print('클러스터 인코딩 ok')

    brandEncoded = pd.DataFrame(brandEncoded, columns = brandEncoder.categories_[0])
    ClusterEncoded = pd.DataFrame(ClusterEncoded, columns = ClusterEncoder.categories_[0])

    testdf = pd.concat([testdf, brandEncoded, ClusterEncoded], axis = 1)
    print('인코딩 결과 병합 ok')


    # 더미변수 처리 (TREE)
    # Label Encoder 로드
    brandEncoderLabel = joblib.load('../brandEncoder_Label.joblib')
    brandEncodedLabel = brandEncoderLabel.transform(test2['brand'].values.reshape(-1,1))
    brandEncodedLabel = pd.DataFrame(brandEncodedLabel)
    X2 = pd.concat([test2, brandEncodedLabel], axis = 1)
    X2 = X2.drop('brand', axis = 1)
    X2.rename(columns={0 : 'brand'}, inplace= True)

    testdf = testdf.drop('brand', axis = 1)
    testdf = testdf.drop('Cluster', axis = 1)

    
    # 독립변수와 종속변수로 나누기
    X = testdf

    # 변수 처리
    # 데이터 스케일링
    Scaler = load(open('../RobustScaler.pkl', 'rb'))
    X1 = Scaler.transform(X)

    ScalerL = load(open('../RobustScaler_tree.pkl', 'rb'))
    X3 = ScalerL.transform(X2)


    # 3. 모델 로드
    SD_keras_model = keras.models.load_model("../SD_Tensorflow_model.hdf5")
    SD_RF_model = joblib.load('../SD_RandomForestModel.pkl')
    SD_LGBM_model = joblib.load('../SD_LightGBMModel.pkl')
    SD_XGB_model = joblib.load('../SD_XGBoostModel.pkl')
    SD_GB_model = joblib.load('../SD_GradientBoostModel.pkl')

    # 4. 예측 수행
    predANN = SD_keras_model.predict(X1)
    predRF = SD_RF_model.predict(X3)
    predLGBM = SD_LGBM_model.predict(X3)
    predXGB = SD_XGB_model.predict(X3)
    predGB = SD_GB_model.predict(X3)

    print('PREDICT VALUE_ANN :', predANN, '원')
    print('PREDICT VALUE_RF :', predRF, '원')
    print('PREDICT VALUE_LGBM :', predLGBM, '원')
    print('PREDICT VALUE_XGB :', predXGB, '원')
    print('PREDICT VALUE_GB :', predGB, '원')

    predANN = np.array2string(predANN)
    predRF = np.array2string(predRF)
    predLGBM = np.array2string(predLGBM)
    predXGB = np.array2string(predXGB)
    predGB = np.array2string(predGB)

    # 5. 응답 처리
    return jsonify( {
        'ANN_VALUE' : predANN,
        'RF_VALUE' : predRF,
        'LGBM_VALUE' : predLGBM,
        'XGB_VALUE' : predXGB,
        'GB_VALUE' : predGB
    } )

if __name__ == '__main__':
    app.run(debug=True)