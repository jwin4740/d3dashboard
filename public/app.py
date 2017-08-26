import numpy as np
from random import random, randrange

estimator_dict_example=["Logistic Regression", "Hamilton", "Burr", "Jefferson", "lin", "Random Forest", "Gradient Boosting", "Naive Bayes"]
roc_sample={}
dim=100

for i in estimator_dict_example:
    fpr=[randrange(0,1000)/1000. for i  in range(dim) ]
    roc_sample[i]={"tpr":[randrange(int(i*1000),1000)/1000. for i  in fpr ], "fpr":fpr}
    
import json
with open('sample2.json', 'w') as outfile:
    json.dump(roc_sample, outfile)    
