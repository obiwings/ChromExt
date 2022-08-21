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
    # 수정된 데이터 출력
    print('-' * 25, '수정된 데이터', '-' * 25)
    print(testdf)
    print('-' * 65)

    # 더미변수 처리
        # One-hot Encoder 로드
    brandEncoder = joblib.load('../brandEncoder.joblib')
    ClusterEncoder = joblib.load('../ClusterEncoder.joblib')
        # 변수 처리
    # 데이터 스케일링
    
        # 학습데이터의 정보가 들어간 Robust Scaler 로드
        # 스케일링

    '''
    ======해야할 일======
    1. brand와 cluster 더미변수 처리
      1) sklearn의 One-hot encoding으로 처리.
      2) 전처리 파일에서 One-hot encoding 돌려보고 만들어지는 더미변수가 get_dummys() 랑 같으면 그냥 하고
      3) 다르다면 전처리부터 머신러닝까지 새로 모델링
    2. 데이터 스케일링 - Robust스케일로 표준화
      1) Scaler도 전처리 파일에서 새로 저장해야됨
    3. 모델 예측 수행
    4. site1.js 로 response 받은 데이터를 popup.html에 뿌려주기
    5. popup.html 재정비
    6. 가능하다면 전처리를 더 매끄럽게 하고 데이터 양을 늘려서 학습되는 모델 성능을 좀 괜찮게 하고 싶음
    7. 모든 작업 코드 정리
    '''


    # 3. 모델 로드
    KNN = joblib.load('../SD_KNN(Tuning)_model.pkl')
    LGBM = joblib.load('../SD_LGBM(Tuning)_model.pkl')
    # 4. 예측 수행
    # 5. 응답 처리
    return jsonify( {'data':'데이터 전송 완료및 통신 성공'} )
    # else:
    #     results = {
    #         'code':0
    #     }
    #     return jsonify( results )

if __name__ == '__main__':
    app.run(debug=True)