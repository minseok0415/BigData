import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("mykey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

doc_ref = db.collection(u'mbti')
docs = doc_ref.stream()

for doc in docs: ref = doc.to_dict()

ratio = []
labels = []
for k, v in ref.items():
    ratio.append(v)
    labels.append(k)

import matplotlib.pyplot as plt
wedgeprops={'width': 0.2}
colors = ['#ff9999', '#ffc000', '#8fd9b6', '#d395d0'] * 4

plt.pie(ratio, labels=labels, wedgeprops=wedgeprops, colors=colors)
plt.savefig('K_MBTI.png')


from google.cloud import storage
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="mykey.json"
client = storage.Client()
bucket = client.get_bucket('p1xel-art.appspot.com')

imageBlob = bucket.blob("/")
imagePath = "K_MBTI.png"
imageBlob = bucket.blob("K-MBTI")
imageBlob.upload_from_filename(imagePath)