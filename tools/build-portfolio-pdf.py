"""Build a selectable-text PDF from the reviewed manuscript, using local Chrome."""
from pathlib import Path
import html, re, subprocess, shutil, tempfile
ROOT = Path(__file__).resolve().parents[1]
source = (ROOT / 'docs/portfolio-pdf-revision.md').read_text()
body = source.split('## 3. 페이지별 교체 원고')[1].split('## 4.')[0]
sections = re.split(r'\n### ', '\n' + body)[1:]
visuals = {4:'after-dashboard.png',7:'dashboard-color-source.png',8:'dashboard-handoff-source.png',9:'after-dashboard.png',11:'after-platform.png',14:'platform-navigation-source.png',17:'after-platform.png',18:'after-intranet.png',20:'intranet-booking-source.png',21:'intranet-approval-source.png',22:'after-intranet.png',23:'kanban-board-source.png',25:'kanban-detail-source.png',26:'kanban-board-source.png'}
def inline(text):
    text = html.escape(text)
    return re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', text)
pages=[]
for section in sections:
    title=section.splitlines()[0]; number=int(title.split(' · ')[0])
    quotes=[line[1:].strip() for line in section.splitlines() if line.startswith('>')]
    groups=[]; current=[]
    for line in quotes+['']:
        if line: current.append(line)
        elif current: groups.append(current); current=[]
    text=''.join('<p>'+ '<br>'.join(inline(x) for x in group)+'</p>' for group in groups)
    image=re.search(r'\*\*사용 화면:\*\* `([^`]+)`',section)
    image=image[1] if image else ('assets/cases/'+visuals[number] if number in visuals else None)
    picture=f'<figure><img src="../{image}" alt="{html.escape(title)}"></figure>' if image else ''
    pages.append(f'<section class="page {"illustrated" if image else "text-only"}" id="page-{number}"><header>HANUL · PRODUCT DESIGN PORTFOLIO<span>2026.10.05</span></header><h1>{html.escape(title)}</h1><main><article>{text}</article>{picture}</main><footer><a href="#page-3">목차</a><span>{number:02} / 34</span></footer></section>')
assert len(pages)==34
css='''@page{size:420mm 297mm;margin:0}*{box-sizing:border-box}html{font-family:"Noto Sans KR",sans-serif;color:#20242a}body{margin:0} .page{width:420mm;height:297mm;padding:16mm 20mm;position:relative;break-after:page;background:#fafaf7}.page:last-child{break-after:auto}header,footer{display:flex;justify-content:space-between;font-size:11px;letter-spacing:1px;color:#67706d}h1{font-size:26px;line-height:1.4;margin:12mm 0 8mm;font-weight:650;max-width:100%}main{display:flex;gap:14mm;height:213mm}article{flex:1;min-width:0}p{font-size:17px;line-height:1.65;margin:0 0 5mm;word-break:keep-all;overflow-wrap:anywhere}strong{font-weight:700}figure{margin:0;flex:0 0 49%;display:flex;align-items:center;justify-content:center;background:#eef0ed;border-radius:5mm;padding:5mm}img{max-width:100%;max-height:195mm;object-fit:contain}footer{position:absolute;bottom:12mm;left:20mm;right:20mm}a{color:inherit;text-decoration:none}.text-only article{columns:2;column-gap:16mm}.text-only p{break-inside:avoid}.text-only:first-child article{columns:1;max-width:280mm}.text-only:first-child p:first-child{font-size:48px;font-weight:700;line-height:1.35;margin-top:18mm}.illustrated p{font-size:16px}'''
output=ROOT/'docs/portfolio-print.html'
output.write_text('<!doctype html><html lang="ko"><meta charset="utf-8"><title>이한울 포트폴리오</title><link rel="stylesheet" href="../assets/fonts/fonts.css"><style>'+css+'</style><body>'+''.join(pages)+'</body></html>')
backup=ROOT/'assets/portfolio-before-project-separation.pdf'
if not backup.exists(): shutil.copy2(ROOT/'assets/portfolio.pdf',backup)
chrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
temporary = Path(tempfile.mkdtemp(prefix='portfolio-pdf-')) / 'portfolio.pdf'
process = subprocess.Popen([chrome,'--headless','--no-sandbox','--disable-gpu','--user-data-dir=/tmp/portfolio-pdf-chrome','--no-pdf-header-footer','--allow-file-access-from-files','--timeout=15000','--print-to-pdf='+str(temporary),output.as_uri()], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
try:
    process.wait(timeout=45)
except subprocess.TimeoutExpired:
    process.terminate()
    process.wait(timeout=10)
assert temporary.exists() and temporary.stat().st_size > 100000, 'Chrome did not produce a PDF'
shutil.copyfile(temporary, ROOT/'assets/portfolio.pdf')
shutil.rmtree(temporary.parent)
print('Built 34 pages:',ROOT/'assets/portfolio.pdf')
