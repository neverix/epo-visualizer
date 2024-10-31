import json
import os
json.dump(os.listdir("public/epo"), open("src/epoFiles.json", "w"))