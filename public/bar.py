# As before  here is a simple python script to generate some random data for 
# the bar graph. We can talk about the purpose a bit later if interested. 
# The script returns a json string formatted { “feature_name”: value ,…} the 
# feature_name should be the x axis of the bar graph and the value will be a number 
# between 0 and 1 indicating the height of the bar. 
from random import randrange
import random, string
rand_str = lambda n: ''.join([random.choice(string.ascii_lowercase) for i in range(n)])

dim=10
rand_init=randrange(0,1000)/1000.
tot_prob=0
vi_dict={}
for i in range(dim):
    vi_dict[rand_str(3)]=rand_init
    tot_prob+=rand_init
    rand_init=randrange(0,1000-int(tot_prob*1000))/1000.
    
import json
with open('sample_bar.json', 'w') as outfile:
    json.dump(vi_dict, outfile)    
