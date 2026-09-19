import json,subprocess
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
jobs=json.loads(Path('registry/navigation-instance-migration.json').read_text())['instances'];pairs=set((j['component'].lower(),j['officialId'].split('-demo-')[-1]) for j in jobs if j['component'] in ['Tabs','Breadcrumb'])
def fetch(pair):
 name,slug=pair;p=Path('artifacts/official-navigation/source')/name/(slug+'.tsx');p.parent.mkdir(parents=True,exist_ok=True)
 r=subprocess.run(['curl','-fsSL','https://raw.githubusercontent.com/ant-design/ant-design/6.6.4/components/'+name+'/demo/'+slug+'.tsx','-o',str(p)],capture_output=True)
 return name,slug,r.returncode
with ThreadPoolExecutor(max_workers=8) as ex:
 for result in ex.map(fetch,sorted(pairs)):print(*result)
