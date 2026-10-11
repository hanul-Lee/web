from pathlib import Path
import json, html, shutil, subprocess, hashlib, zipfile
ROOT=Path(__file__).resolve().parent
P=[]
def add(n,group,current,old_desc,title,desc,blocks,issues,layout,question,priority='중요',evidence='현재 화면과 본인 설명'):
 P.append(dict(n=n,group=group,current=current,old_desc=old_desc,title=title,desc=desc,blocks=blocks,issues=issues,layout=layout,question=question,priority=priority,evidence=evidence))
B=lambda title,text: dict(title=title,text=text)
add(1,'소개','복잡한 업무 정보를 명확한 UI로 설계합니다','B2B 업무 서비스의 정보 구조·UX/UI·퍼블리싱을 담당하는 디자이너 이한울입니다.',
 '복잡한 업무 정보를\n찾고 쓰기 쉬운 화면으로 설계합니다.',
 'B2B 업무 서비스의 정보 구조와 UX/UI를 설계하고, HTML·CSS·SCSS 퍼블리싱까지 연결하는 디자이너 이한울입니다.',
 [B('대표 경험','통합 관리 플랫폼 · 현장 안전 기록 · 비용·인원 대시보드'),B('담당 범위','정보 구조 → 화면 설계 → 퍼블리싱')],
 ['B2B 분야와 담당 범위는 분명해졌다. 다만 세 줄의 큰 소개가 모두 비슷한 역할을 하고 노란 문장이 너무 길다.','문장을 제목 2줄 + 소개 2줄로 줄이면 첫 화면에서 분야와 강점을 함께 이해하기 쉽다.'],
 '제목은 왼쪽 2줄. 소개와 이름은 그 아래. 노란색은 한 단어나 이름에만 사용한다. 실제 UI를 넣는다면 플랫폼 화면 한 장만 작게 배치한다.',
 '복잡한 업무 정보 중 무엇을 어떻게 단순하게 만들었나요?',priority='보완')
add(2,'소개','업무 구조를 이해하고 UI와 퍼블리싱까지 연결합니다.','연락처만 배치되어 있고 경력을 소개하는 설명문은 없음',
 '업무 구조를 이해하고, UI와 구현을 연결합니다.',
 '2022년 12월부터 B2B 업무 서비스의 정보 구조·화면 설계·퍼블리싱을 담당했습니다. 이전에는 기업·브랜드 웹사이트의 UI와 반응형 화면을 제작했습니다.',
 [B('2022.12–현재 · 삼안 기술개발센터','B2B 플랫폼·ERP·모바일 업무 서비스의 UX/UI 설계\n공통 UI 기준과 HTML·CSS·SCSS 퍼블리싱'),B('2020.09–2022.12 · 햄섬피쉬','기업·브랜드 웹사이트 UI 제작\n반응형 화면 설계와 퍼블리싱 참여'),B('업무 역량','정보 구조 · 화면 흐름 · UI 디자인 · 퍼블리싱\nFigma · HTML · CSS · SCSS · JavaScript · Photoshop')],
 ['특허번호가 비어 있고 [사이트명]·[기간]·[방문자/방문/조회]·[출처]가 그대로 남았다. 제출 전 반드시 정리해야 한다.','UX 리드·특허 등록·누적 방문자 9만은 책임 범위와 증빙 없이 쓰면 질문에 답하기 어렵다. 수정 원고는 확인되는 업무만 남겼다.','학력의 수여기관·학위·전공은 증명서에 맞춰 표기한다. 국가평생교육진흥원을 실제 교육기관처럼 쓰지 않도록 확인한다.','회색 본문이 작고 회사별 업무 사이 공백이 크다. 회사명·기간·업무 2줄을 같은 기준으로 정렬한다.'],
 '좌측 60%는 경력 두 행, 우측 40%는 역량·도구·확인된 학력. 초안은 미확인 학력을 생략했다. 이름과 이메일은 상단에 작게 배치한다.',
 '팀의 결과에서 본인이 결정하고 제작한 부분은 어디까지인가요?',priority='필수')
add(3,'소개','목차 Contents','별도 설명문 없음',
 '업무 구조에서 화면과 구현까지',
 '배포된 플랫폼과 현장 기록 서비스를 먼저 소개합니다. 이어서 ERP 설계·퍼블리싱과 공통 UI 재사용 경험을 보여드립니다.',
 [B('01 통합 관리 플랫폼 · 04–10','지도와 공통 메뉴로 현장 자료 탐색 · 배포 후 실사용'),B('02 현장 안전 기록(TBM) · 11–15','종이 일지를 웹·모바일 입력으로 전환 · 배포 후 실사용'),B('03 비용·인원 ERP · 16–19','조회 범위와 대시보드 설계 · 웹 설계안 최종 미사용'),B('04 공통 UI 기준 · 20–23','컬러 토큰·SCSS·일부 UI 요소 재사용'),B('추가 경험 · 24–25 / 연락처 · 26','팀 내부 모바일 설계 · 개인 칸반 프로토타입')],
 ['네 대표 사례의 순서와 페이지 범위는 잘 정리됐다. 24·25·26쪽이 목차에 없어 마지막 흐름을 예측하기 어렵다.','TBM·ERP의 SaaS 표시는 제공 방식이 확인되지 않으면 B2B 업무 서비스로 바꾼다. SaaS는 화면 유형이 아니라 제공·운영 방식이다.','목업을 크게 보여주느라 담당과 서비스 상태가 보이지 않는다. 프로젝트당 한 줄 역할과 한 줄 상태를 추가한다.'],
 '네 대표 사례를 2×2 카드 또는 4행으로 배치한다. 큰 장치 목업을 줄이고 페이지 범위·설계 주제·상태를 먼저 읽히게 한다.',
 '가장 자신 있게 설명할 두 사례는 무엇인가요?',priority='중요')
add(4,'통합 플랫폼','지도와 업무별 자료를 연결하는 통합 관리 플랫폼','공정·자원·보상·현장 자료를 탐색하도록 공통 메뉴와 지도 기반 UI를 설계했습니다.',
 '지도와 업무 자료를 연결한\n통합 관리 플랫폼',
 '현장·본사·외부 사용자가 필요한 자료를 찾도록 공통 메뉴와 지도 중심 화면을 설계했습니다. 정보 구조·UI·퍼블리싱을 담당했으며, 배포 후 실제 사용자가 이용했습니다.',
 [B('기간','2023.01–2023.12'),B('담당','사용자 목적 정리 · 정보 구조 · UI · 퍼블리싱 · 기획 참여'),B('협업과 상태','개발자 · 기획자 · 엔지니어와 협업\n배포 후 실사용 · 전시 활용')],
 ['실사용 상태와 협업 직군이 표지에 들어가 신뢰가 좋아졌다. 제목과 부제는 통합 관리 플랫폼을 반복한다.','표지 화면은 오른쪽이 프레임 밖으로 잘린다. 전체 화면은 안에 넣고 작은 UI의 세부 내용은 다음 쪽에서 확대한다.','DMC 전시는 어떤 행사·장소인지 설명할 자료가 있으면 구체화한다. 현재 자료의 표기는 독립 확인된 사실이 아니다.'],
 '왼쪽 제목·설명 45%, 오른쪽 평면 UI 55%. 표지 하단에 기간/담당/협업·상태 세 항목을 맞춘다.',
 '서로 다른 사용자에게 같은 메뉴를 제공한 이유는 무엇인가요?',priority='보완')
add(5,'통합 플랫폼','같은 현장 자료도 사용자마다 확인 목적이 달랐습니다.','공정·자원·보상·현장 정보가 문서와 파일, 여러 프로그램에 나뉘어 있었습니다. 자료의 위치를 찾고 다른 자료로 이동하는 흐름을 바탕으로, 관련 정보를 연결하는 구조를 설계했습니다.',
 '흩어진 현장 자료를 업무 목적에 따라 정리했습니다.',
 '현장·본사·외부 사용자는 같은 자료도 서로 다른 목적으로 확인했습니다. 파일과 프로그램별로 나뉜 자료를 업무 단위로 묶는 것을 설계 과제로 삼았습니다.',
 [B('기존 업무','공정·자원·보상·현장 자료를 파일과 프로그램에서 각각 찾아 확인'),B('현장 관리자','공정과 현장 위치에 관련된 정보 확인'),B('본사 담당자','공정·자원·보상 관리 현황 확인'),B('외부 이해관계자','프로젝트 현황과 시각화 자료 확인'),B('설계 과제','공통 메뉴에서 업무를 선택하고 지도와 관련 자료를 이어서 확인')],
 ['상단과 하단 카드 사이 공백이 크고 같은 문제를 두 번 설명한다.','사용자 카드에서 정보본사·현황외부처럼 역할과 내용이 붙어 있다. 세 사용자를 독립된 행으로 나눈다.','문제의 출처가 없다. 현재 자료는 본인의 업무 설명으로 볼 수 있으며 인터뷰·관찰 결과로 소개해서는 안 된다.'],
 '왼쪽 기존 업무 1개, 오른쪽 사용자별 목적 3행, 하단 설계 과제 1줄. 카드 시작을 y=350 근처로 올린다.',
 '자료가 나뉘어 있다는 사실은 어떤 업무 자료에서 확인했나요?',priority='중요')
add(6,'통합 플랫폼','공통 메뉴에서 업무별 자료를 찾도록 분류했습니다.','공정·자원·보상·지도 정보를 업무 단위로 정리했습니다. 공통 메뉴 안에서 관련 자료를 이어서 확인하는 방향으로 IA를 구성했습니다.',
 '현장 설명과 사업 관리의 공통 메뉴를 구성했습니다.',
 '공통 메뉴를 현장 설명과 사업 관리로 나누고, 관련 기능으로 접근하도록 구성했습니다. 아래 기능은 현재 캡처에서 확인되는 메뉴 항목입니다.',
 [B('공통 메뉴','현장 설명 / 사업 관리'),B('화면에 보이는 기능','CCTV · GSIM · 실감형 모델 · 도면 · 원격협업\n시뮬레이션 · 품질안전 · 유지관리 · 더보기 · 사이트맵'),B('본인 담당','업무별 자료 분류 · 공통 메뉴의 정보 구조 · 지도와 관련 정보의 탐색 UI')],
 ['왼쪽은 사업관리 선택 화면의 기능이라고 썼지만 오른쪽 화면은 현장설명 탭이 활성화되어 있다. 두 탭의 하위 구조를 이 캡처 하나로 확정하면 안 된다.','탭별 하위 분류는 실제 원본을 확인한 뒤 확정이라는 편집 지시가 남아 있다. 제출본에서 제거한다.','단순 기능 나열과 실제 정보 구조는 다르다. 탭별 메뉴 원본이 있으면 두 구조를 정확히 분리한다.'],
 '왼쪽 공통 메뉴와 확인되는 기능 목록, 오른쪽 메뉴 부분 확대. 현재 캡처로 확인되지 않은 탭별 하위 분류는 그리지 않는다.',
 '현장 설명과 사업 관리의 기능은 어떤 기준으로 나뉘나요?',priority='필수')
add(7,'통합 플랫폼','지도와 관련 자료를 이어서 확인하도록 구성했습니다.','지도에서 선택한 위치와 관련 공정·현장 자료를 연결했습니다. 전체 위치와 상세 정보를 오가며 확인하도록 지도 중심 탐색을 구성했습니다.',
 '지도에서 업무 메뉴와 관련 자료로 이어집니다.',
 '지도로 공정 구간과 현장 위치를 확인하고, 하단 메뉴에서 업무를 선택하도록 구성했습니다. 시뮬레이션을 선택하면 관련 자료 유형을 확인할 수 있습니다.',
 [B('1 지도','공정 구간과 현장 위치를 확인하는 배경'),B('2 업무 메뉴','시뮬레이션 등 필요한 기능으로 이동하는 진입점'),B('3 자료 유형 선택','공정·주행·일조·배수 시뮬레이션 항목 확인')],
 ['실제 UI와 1·2·3 설명을 대응한 점은 좋아졌다.','우측 설명 1/2/3은 작업용 표현이다. 지도/업무 메뉴/자료 유형처럼 실제 요소 이름으로 바꾼다.','현재 화면은 위치를 클릭해 해당 자료가 연결되는 동작까지 증명하지 않는다. 제목 아래 설명을 캡처에서 확인되는 흐름으로 좁힌다.'],
 '왼쪽 UI 65%, 오른쪽 번호 설명 35%. 번호3은 모달 제목보다 자료 카드 영역에 붙인다. 하단에 지도 → 메뉴 → 자료 유형 흐름을 적는다.',
 '지도를 유지하면서 메뉴를 여는 것이 사용자에게 어떤 이점이 있나요?',priority='중요')
add(8,'통합 플랫폼','지도와 메뉴의 구분을 고려해 반투명 검정안을 선택했습니다.','흰색·검정·반투명 검정 배경과 메뉴 구성의 대안을 비교했습니다.',
 '메뉴를 구분하면서 지도가 이어 보이는 안을 선택했습니다.',
 '흰색·검정·반투명 검정 메뉴를 검토했습니다. 메뉴의 구분과 지도 배경의 연속성을 함께 고려해 반투명 검정안을 선택했습니다.',
 [B('A · 흰색','메뉴 경계는 선명하지만 지도와 분리되어 보임'),B('B · 검정','메뉴 영역의 존재감이 강하게 드러남'),B('C · 반투명 검정 · 선택','메뉴를 구분하면서 지도 배경의 연속성을 고려')],
 ['디자인 선택 이유가 세 안과 연결돼 설득력이 좋아졌다. 현재 구성의 강점이므로 유지한다.','전체 지도가 커서 비교 대상인 메뉴가 너무 작다. 같은 비율의 메뉴 부분 확대를 붙인다.','메뉴 항목과 활성 상태도 다른 비교다. 시각 검토에 따른 선택이라는 현재 한계 설명을 한 줄로 정리하고 사용성 평가 결과처럼 쓰지 않는다.'],
 '상단 3개 메뉴 확대를 같은 크기로 배치한다. 하단에 기준/안별 차이/선택을 3행으로 정리한다. 필요하면 전체 지도는 작게 보존한다.',
 '이 안을 선택하면서 포기한 점은 무엇이고 가독성은 어떻게 확인했나요?',priority='중요')
add(9,'통합 플랫폼','위치·공정·영상·3D 자료를 확인하는 UI를 구성했습니다.','관련 파일을 각각 여는 대신, 업무와 위치의 맥락에서 자료를 연결하도록 정리했습니다. 지도와 관련 자료를 이어서 확인하는 UI를 구성했습니다.',
 '자료 유형에 맞는 메뉴 진입점을 정리했습니다.',
 '도면·영상·3D 자료의 유형과 화면 메뉴를 대응해 정리했습니다. 이 페이지는 자료 탐색을 위한 정보 구조와 UI 구성을 보여줍니다.',
 [B('도면 자료','도면 메뉴로 접근'),B('시뮬레이션 영상','시뮬레이션 메뉴에서 자료 유형 확인'),B('3D 자료','실감형 모델 메뉴로 접근'),B('본인 담당','자료 분류 · 정보 구조 · UI · 퍼블리싱')],
 ['가운데는 영상→CCTV라고 썼지만 왼쪽 파일에는 공정·주행·일조·배수 시뮬레이션 영상도 있다. 모든 영상을 CCTV에 연결하지 않는다.','자료 유형→관련 메뉴→확인 화면은 너무 일반적이다. 도면/시뮬레이션 영상/3D 자료를 실제 메뉴 이름과 대응한다.','파일 탐색기와 시뮬레이션 화면만으로 변환·자동 연동까지 검증할 수 없다. 화면 설계의 담당 범위에 맞춰 설명한다.','중앙 하단의 위치 정보 공정 정보 현장 영상 3D 상세는 대응이 불분명하다. 삭제한다.'],
 '자료 유형–메뉴–UI 진입점 3행으로 재구성하고 실제 화면 1장을 오른쪽에 둔다. 파일 목록은 대표 파일명만 확대한다.',
 '자료 분류와 실제 데이터 연동 중 본인이 맡은 부분은 무엇인가요?',priority='중요')
add(10,'통합 플랫폼','UI·퍼블리싱을 담당한 통합 플랫폼이 배포되어 실제 사용자가 사용했습니다.','파일·프로그램별로 나뉜 자료를 업무 단위로 분류하고, 지도와 상세 정보를 연결했습니다.',
 '설계와 퍼블리싱을 담당한 플랫폼이 실제 사용으로 이어졌습니다.',
 '공통 메뉴·지도 중심 탐색 UI를 설계하고 HTML·CSS·SCSS로 퍼블리싱했습니다. 관련 직군과 정보 범위와 UI 기준을 조율했으며, 배포된 플랫폼은 실제 사용자가 이용했습니다.',
 [B('본인 산출물','업무별 자료 분류\n지도와 관련 정보의 탐색 UI\nHTML·CSS·SCSS 퍼블리싱'),B('확인된 활용','배포 후 실제 사용자 이용\n프로젝트 시연과 내부 소통에 산출물 활용'),B('협업','개발자·기획자·엔지니어와 정보 범위와 UI 기준 조율')],
 ['Before 카드의 내용은 기존 상태가 아니라 산출물이다. After 역시 개선 화면이 아니라 활용 범위다. 카드명을 산출물/활용/협업으로 바꾼다.','배포와 실사용은 중요한 결과지만 사용 시간 단축·오류 감소 등 효과 측정과 구분한다. 현재 설명에는 측정 자료가 없다.','85.6점은 과제 전체 평가라는 구분은 적절하다. 원자료가 없으므로 초안에서는 생략했다. 평가기관·시점·출처가 확인되면 각주로 유지할 수 있다.','협업 문장이 일반적이다. 실제 요청·제약·본인 판단·변경 UI 한 건이 있으면 추가한다.'],
 '3개 카드의 첫 줄을 왼쪽 정렬. 각 카드 내용은 3줄 이내. 협업 증거가 확보되면 세 번째 카드에 관련 UI 부분 확대를 넣는다.',
 '협업 과정에서 실제로 의견이 달랐던 한 건과 본인의 판단을 설명해 주세요.',priority='필수')
add(11,'TBM','수기로 쓰던 현장 일지를 웹·모바일 기록으로 전환했습니다.','웹 입력은 종이 기록의 분실·변색·판독 어려움 위험에 대응하고, 모바일은 현장에서 일지를 쉽게 작성하도록 설계했습니다.',
 '현장 안전 점검 일지를\n웹·모바일 기록으로 전환했습니다.',
 '작업 전 안전 점검을 기록하는 TBM 일지를 디지털 입력 화면으로 설계했습니다. 웹은 기록 보관과 판독 문제에 대응하고, 모바일은 현장 작성을 지원하도록 구성했습니다.',
 [B('기간','2025.11–2026.04'),B('담당','모바일 기획·디자인 · 웹 UI 참여'),B('협업과 상태','개발자와 협업\n배포 후 실제 사용자 이용')],
 ['기간과 실사용 상태가 추가돼 사례의 맥락이 좋아졌다. TBM은 비전문가에게 낯설기 때문에 현장 안전 점검 일지라는 설명을 먼저 넣는다.','B2B SaaS의 제공 방식은 현재 자료로 알 수 없다. B2B 현장 기록 서비스로 바꾼다.','서비스 전환 전체를 혼자 한 것처럼 읽히지 않게 담당과 협업을 연결한다.','홈 화면 표지에는 장치 프레임을 써도 된다. 상세 설명에서는 중립 프레임과 실제 입력 화면을 사용한다.'],
 '제목 2줄, TBM 뜻과 웹/모바일 목적 2줄. 오른쪽 홈 UI, 하단 기간·담당·협업/상태.',
 '웹과 모바일에서 풀려던 문제는 각각 무엇인가요?',priority='중요')
add(12,'TBM','종이 일지의 보관·판독 문제에 대응할 디지털 입력이 필요했습니다.','비용·인원 화면을 설계하며 조회 범위와 비교 기준을 UI보다 먼저 정리하는 중요성을 배웠습니다.',
 '종이 일지의 보관과 판독 문제를 설계 과제로 삼았습니다.',
 '종이 일지는 보관 중 분실·변색될 수 있고 손글씨를 읽기 어려울 수 있었습니다. 웹에는 기록을 입력하고 보관하는 구조를, 모바일에는 현장에서 작성하는 화면을 설계했습니다.',
 [B('보관 문제','분실·변색 위험에 대응할 디지털 기록'),B('판독 문제','손글씨 대신 내용을 입력하는 항목'),B('현장 작성','모바일에서 일지를 작성하는 화면'),B('기존 기록 항목','작업일 · 작업 내용 · 위험 요인 · 확인 항목 · 참여자 서명')],
 ['제목 아래 문구가 ERP 회고다. TBM의 문제·웹/모바일 목적 설명으로 즉시 교체한다.','종이 일지에 실명·서명·회사/현장 식별 정보가 남아 있다. 제출용 원본에서 익명화하고 다시 내보낸다.','기존 폼과 UI 사이 항목 대응이 빠졌다. 기존 위험 요인/확인 항목 등이 디지털 화면의 어디로 갔는지 실제 UI에 번호를 붙인다.','문제는 본인의 업무 설명에 근거한다. 인터뷰·현장 조사 수치나 법적 문제 발생을 추가하지 않는다.'],
 '기존 일지 전체 2장을 줄이고 익명화된 핵심 항목만 확대한다. 오른쪽에 보관/판독/현장 작성 세 과제를 연결한다. HTML 초안은 식별 정보 대신 항목 요약을 사용한다.',
 '종이 일지에서 그대로 유지한 항목과 바꾼 항목은 무엇인가요?',priority='필수')
add(13,'TBM','작성일·인원·확인 항목을 모바일 일지 화면에 배치했습니다.','매일 반복되는 종이 서류는 단순한 불편함을 넘어 법적 리스크와 관리 비용을 증대시켰습니다.',
 '작성일·출역 인원·확인 항목을 한 화면에 배치했습니다.',
 '일지의 날짜와 출역 인원, 담당·소장 확인 상태, 근로자 확인 항목을 모바일 화면에 배치했습니다. 하단의 작성하기 버튼으로 다음 입력 단계에 진입하도록 구성했습니다.',
 [B('1 작성 맥락','작성일과 금일 출역 인원 확인'),B('2 확인 상태','담당과 소장의 확인 표시 및 액션'),B('3 작성 진입','근로자 확인 항목과 작성하기 버튼')],
 ['법적 리스크와 관리 비용 증가를 증명할 자료가 없다. 화면 구성 설명으로 교체한다.','로그인 화면은 일지 구성 설명에 기여가 적다. 일지 화면을 더 크게 보여준다.','우측 설명 1/2/3은 실제 항목 이름으로 바꾼다.','UI 날짜 2025.10.30이 표지 시작일 2025.11보다 빠르다. 예시 날짜·이전 화면·작업기간 수정 중 실제 이유를 확인해 정리한다. 임의로 예시라고 단정하지 않는다.'],
 '로그인을 빼고 TBM 화면 1장을 크게 배치한다. 작성일/확인상태/작성하기 번호를 실제 요소와 맞춘다. 작성하기 이후 화면이 있으면 작은 다음 단계로 추가한다.',
 '이 화면의 확인 상태와 일지 작성은 어떤 순서로 진행되나요?',priority='필수')
add(14,'TBM','서명을 저장하고 저장 완료 상태를 확인하도록 구성했습니다.','매일 반복되는 종이 서류는 단순한 불편함을 넘어 법적 리스크와 관리 비용을 증대시켰습니다.',
 '서명 입력과 저장 완료를 구분해 보여줍니다.',
 '마이페이지에서 서명을 입력하거나 변경하고 저장하도록 구성했습니다. 저장 후에는 완료 메시지를 표시해 처리 결과를 확인할 수 있게 했습니다.',
 [B('1 서명 입력·변경','서명 영역 · 지우기 · 저장 버튼'),B('2 완료 확인','서명이 저장 되었습니다. 메시지 · 닫기 버튼')],
 ['제목과 두 화면은 서로 맞는다. 제목 아래 설명만 종이 서류 문제의 반복이라 서명 흐름으로 교체한다.','여기서 보여주는 것은 마이페이지의 서명 변경이다. 일지 전체 저장 완료나 서명 재사용 규칙을 이 화면만으로 주장하지 않는다.','저장 중·실패·빈 서명 처리가 있으면 실제 화면을 추가할 수 있다. 현재 캡처는 입력과 성공 상태 두 가지다.'],
 '입력 → 저장 → 완료 메시지의 짧은 화살표를 추가한다. 두 UI는 같은 크기와 기준선. 각 설명은 1줄.',
 '저장에 실패하거나 서명을 입력하지 않았을 때는 어떻게 처리하나요?',priority='중요')
add(15,'TBM','TBM 서비스를 배포했고 실제 사용자가 사용했습니다.','제목 아래 설명문 없음',
 '담당한 TBM 화면이 배포되어 실제 사용자가 이용했습니다.',
 '모바일 기획·디자인과 웹 UI에 참여하고 개발자와 협업했습니다. 서비스는 배포 후 실제 사용자가 이용했으며, 사용자 의견은 개발자를 통해 전달받았습니다.',
 [B('본인 산출물','모바일 기획·디자인\n웹 UI 참여\n일지·서명 관련 화면'),B('활용 결과','개발자와 협업한 서비스 배포\n실제 사용자 이용'),B('의견 전달 경로','개발자를 통해 사용자 피드백 전달받음')],
 ['설명문이 없어 앞 페이지와 결과의 연결이 약하다. 역할·협업·실사용을 2줄로 연결한다.','협업 근거라는 제목 아래에는 전달 경로만 있다. 전달 경로로 바꾸고 실제 협업 사례가 있을 때만 근거로 제시한다.','상세 피드백이 기억나지 않는 상태를 이전 설명에서 확인했다. 사용자 발언·수정 요구·효과 수치를 새로 만들지 않는다.','3개 큰 가로 상자에 가운데 정렬한 짧은 문구는 공간에 비해 정보량이 낮다. 3열 카드로 줄이고 실제 자료 한 건을 보강할 자리를 만든다.'],
 '산출물/활용 결과/의견 전달 경로 3열. 실제 요청 기록이 있으면 요청 → 본인 변경 → 확인으로 교체한다. 미확보 상태에서는 현재 사실 범위로 닫는다.',
 '배포 후 어떤 사용자가 어떤 업무에 이용했으며 본인은 무엇을 확인했나요?',priority='중요')
add(16,'ERP','역할별 조회 범위에 맞춘 비용·인원 비교 대시보드','전사·프로젝트·개인 범위에 따라 주요 수치와 상세 내역을 확인하는 UI를 설계하고 퍼블리싱했습니다.',
 '조회 목적에 맞춘\n비용·인원 대시보드를 설계했습니다.',
 '전사·프로젝트·개인 범위에 따라 주요 수치와 상세 내역을 확인하는 UI를 설계하고 퍼블리싱했습니다. 제공 형식이 PDF로 변경되어 최종 웹 설계안은 사용되지 않았습니다.',
 [B('기간','2025.11–2026.04'),B('담당','조회 범위 · UX/UI · HTML·CSS·SCSS 퍼블리싱'),B('협업과 상태','개발자와 협업\nPDF 제공으로 변경 · 웹 설계안 최종 미사용')],
 ['미사용 상태가 표지에 명시된 것은 적절하다. 설계·구현 경험 자체를 보조 사례로 보여줄 수 있다.','역할별과 조회 범위별은 다르다. 권한표나 실제 역할 매핑이 없으므로 제목은 조회 목적으로 바꾼다.','화면이 오른쪽에서 잘린다. 전체 화면을 프레임 안에 넣는다.'],
 '왼쪽 제목·범위·상태, 오른쪽 전체 UI. 미사용 상태는 작은 각주에만 두지 않고 표지 설명에도 포함한다.',
 '제공 방식이 바뀐 이유와 이후 활용된 산출물은 무엇인가요?',priority='중요')
add(17,'ERP','기존 자료의 비용·인원 정보를 요약과 상세 영역에 배치했습니다.','매일 반복되는 종이 서류는 단순한 불편함을 넘어 법적 리스크와 관리 비용을 증대시켰습니다.',
 '행 단위 업무 자료를 요약과 상세 정보로 나눴습니다.',
 '기존 자료의 비용·인원 항목을 대시보드의 주요 수치와 프로젝트·인원별 상세 영역에 배치했습니다. 아래 비교는 기존 자료와 웹 설계안의 정보 배치를 보여줍니다.',
 [B('기존 자료','날짜 · 이름 · 직급 · 팀 · 프로젝트 · 투입 시간 · 비용 등 행 단위 기록'),B('웹 설계안','조회 조건 → 주요 수치 요약 → 프로젝트·인원별 상세'),B('비교 범위','기존 자료와 웹 설계안의 구조 비교\n최종 웹 설계안은 미사용')],
 ['법적 리스크 문장이 ERP 화면과 맞지 않는다. 비용·인원 정보 배치 설명으로 교체한다.','TO-BE: 대시보드 적용 후는 미사용 사실과 충돌한다. 웹 대시보드 설계안으로 바꾼다.','원자료의 실명·투입비용·프로젝트명이 보인다. 제출용 이미지에서 익명화하거나 대표 항목만 보여준다.','하단 ①②③이 화면 안에 붙어 있지 않다. 실제 조회 조건/요약/상세에 번호를 붙인다.'],
 '익명화된 원자료와 설계안을 같은 크기로 비교. 화면 내부에 ①조회 조건 ②요약 ③상세를 붙인다. HTML 초안은 원자료 필드 요약을 사용한다.',
 '요약에 올린 수치와 상세로 내린 정보를 어떻게 구분했나요?',priority='필수')
add(18,'ERP','확인 목적에 따라 전사·프로젝트·개인 범위를 나누었습니다.','매일 반복되는 종이 서류는 단순한 불편함을 넘어 법적 리스크와 관리 비용을 증대시켰습니다.',
 '전사·프로젝트·개인으로 조회 목적을 나눴습니다.',
 '여러 프로젝트의 현황, 특정 프로젝트의 상세, 본인과 관련된 업무를 구분했습니다. 조회 조건을 정한 뒤 주요 수치와 상세 내역을 확인하는 순서로 구성했습니다.',
 [B('전사','여러 프로젝트의 비용·인원 현황'),B('프로젝트','선택한 프로젝트의 수치와 상세 내역'),B('개인','본인과 관련된 업무 정보'),B('조회 흐름','조건 설정 → 주요 수치·현황 요약 → 프로젝트·인원별 상세')],
 ['종이 서류 문제 문구를 조회 목적과 순서 설명으로 교체한다.','오른쪽 캡처는 전체 프로젝트 통합/팀·개인별 분석 메뉴를 보여주지만 전사·프로젝트·개인 세 범위별 실제 화면은 모두 보여주지 않는다.','세 범위를 분리한 UI와 역할별 접근 권한은 구분한다. 권한 정책 설계로 소개하지 않는다.','17쪽과 같은 전체 UI를 반복하기보다 범위 메뉴와 요약·상세 부분을 확대한다.'],
 '왼쪽 조회 목적 3행, 오른쪽 실제 메뉴 부분 확대. 하단 흐름 3단계. 범위별 실제 화면이 없으면 개념 설명과 현재 화면을 구분한다.',
 '조회 범위가 바뀌면 어떤 정보와 조건이 달라지나요?',priority='필수')
add(19,'ERP','주요 수치·초과 상태의 기준을 공유하고 웹 UI를 퍼블리싱했습니다.','매일 반복되는 종이 서류는 단순한 불편함을 넘어 법적 리스크와 관리 비용을 증대시켰습니다.',
 '활성 메뉴·합계·초과 상태를 구분해 구현 기준을 정리했습니다.',
 '현재 조회 범위와 합계, 기준을 넘은 투입 시간을 구분하도록 UI를 설계했습니다. 상태 색상과 수치 강조, 요소 간격을 개발자와 공유하고 웹 화면을 퍼블리싱했습니다.',
 [B('활성 메뉴와 합계','선택한 조회 범위를 강조\n비용 항목과 합계를 구분'),B('초과 상태 예시','투입 시간 9/8h\n초과근무 1시간 표시'),B('전달과 산출물','상태 색상 · 수치 강조 · 요소 간격 공유\nHTML·CSS·SCSS 퍼블리싱\n최종 웹 설계안 미사용')],
 ['제목 아래 종이 서류 문제 문구를 실제 UI 기준으로 교체한다.','실제 ERP 전달 자료가 있으면 이 영역에 추가라는 편집 지시를 제출본에서 지운다.','9/8h가 무엇의 비율인지 9시간/기준 8시간처럼 풀어 쓴다. 개선 효과나 실제 직원 평가로 쓰지 않는다.','화면의 실명과 근로 상태 표시는 시연 데이터인지 확인한다. HTML 초안의 시간 예시는 텍스트로 옮겨 이름을 넣지 않았다.','상태 색상 공유는 본인 작성 문장에 근거하며 전달 기록을 독립 확인한 것은 아니다. 실자료가 있으면 한 건을 추가한다.'],
 '실제 메뉴/합계 부분 확대 + 수치 예시 + 전달 범위 3열. 하단에는 예시값과 최종 미사용 상태를 한 줄씩 적는다.',
 '초과 상태와 합계 표시에 대해 개발자에게 어떤 기준을 전달했나요?',priority='필수')
add(20,'공통 UI','컬러 토큰과 공통 UI 기준을 디자인·퍼블리싱에 재사용했습니다.','컬러는 토큰과 SCSS로 관리하고 프로젝트마다 재사용했습니다. 입력·라디오·체크박스 등 일부 UI 요소는 화면에 맞춰 크기를 조정해 사용했습니다.',
 '컬러 토큰과 공통 UI 기준을\n디자인·퍼블리싱에 재사용했습니다.',
 '컬러를 토큰과 SCSS로 관리해 프로젝트마다 사용했습니다. 입력·라디오·체크박스 등 일부 UI 요소는 화면에 맞춰 크기를 조정해 사용하고, 웹 가이드로 정리했습니다.',
 [B('담당','공통 UI 기준 · 가이드 설계 · SCSS 컬러 토큰 관리'),B('실제 사용','디자이너의 디자인·프론트 작업'),B('재사용 범위','컬러와 일부 UI 요소')],
 ['실제 재사용 범위를 좁혀 밝힌 점이 좋다. 독립 사례로 남길 가치가 있다.','부제 디자인 시스템은 범위가 넓다. 공통 UI 기준·웹 가이드로 통일하면 본문의 증거와 맞는다.','기울어진 여러 이미지 대신 웹 가이드의 정면 화면 한 장이면 구조를 읽기 쉽다.','팀 전체 도입·개발자 채택·운영 체계는 현재 자료로 확인되지 않는다. 실제 사용 범위 설명을 유지한다.'],
 '웹 가이드 홈을 정면 배치. 왼쪽에 정의/실제 사용/범위. 표지 하단에는 확인된 담당과 사용 범위만 넣는다.',
 '공통으로 재사용한 기준과 프로젝트마다 바꾼 부분은 무엇인가요?',priority='중요')
add(21,'공통 UI','컬러를 토큰으로 관리하고 프로젝트별 SCSS에서 재사용했습니다.','매일 반복되는 종이 서류는 단순한 불편함을 넘어 법적 리스크와 관리 비용을 증대시켰습니다.',
 '컬러 값을 SCSS 토큰으로 정리했습니다.',
 '공통 컬러 값을 SCSS 변수로 정의하고 웹 가이드에 같은 색상 기준을 정리했습니다. 컬러 토큰은 프로젝트의 디자인·프론트 작업에서 반복 사용했습니다.',
 [B('실제 파일','_variables.scss의 컬러 변수 정의'),B('웹 가이드','Primary·Secondary 색상 단계 정리'),B('재사용 범위','디자이너의 프로젝트 디자인·프론트 작업')],
 ['종이 서류 문제 문구를 컬러 변수와 가이드 설명으로 교체한다.','오른쪽 코드는 왼쪽과 같은 변수 정의다. 실제 적용 코드라고 표기하면 증거를 과장한다.','토큰 정의→이를 참조하는 스타일→실제 적용 UI 중 현재 캡처는 정의와 컬러 가이드까지만 확인된다.','실제 사용 예시는 컬러 웹 가이드로 이름을 바꾼다. 프로젝트 스타일에서 토큰을 참조한 코드 한 건을 확보하면 재사용 증거가 강해진다.'],
 '왼쪽 SCSS 정의, 오른쪽 컬러 가이드. 세 번째 실제 스타일 참조 자료가 있으면 3단계로 확장한다. 동일 코드를 두 번 넣지 않는다.',
 '어떤 스타일에서 어떤 컬러 변수를 참조했나요?',priority='필수')
add(22,'공통 UI','입력·라디오·체크박스는 화면에 맞춰 크기를 조정해 사용했습니다.','매일 반복되는 종이 서류는 단순한 불편함을 넘어 법적 리스크와 관리 비용을 증대시켰습니다.',
 '공통 입력 UI의 상태와 스타일을 정리했습니다.',
 '입력 UI의 상태 예시와 읽기 전용·편집 상태의 스타일을 정리했습니다. 일부 요소를 크기 조정해 사용한 경험은 실제 프로젝트 적용 자료와 함께 설명할 수 있습니다.',
 [B('현재 코드','테이블·목록 안의 입력·텍스트 영역 스타일\n읽기 전용 · 편집 상태 정의'),B('현재 가이드','기본 입력과 라벨·설명문이 있는 입력 예시'),B('실제 사용 범위','입력·라디오·체크박스 일부 요소의 크기를 조정해 사용')],
 ['제목 아래 반복 문구를 입력 UI 설명으로 교체한다.','현재 코드는 입력·textarea이고 화면도 입력이다. 라디오·체크박스나 조정 전후 크기를 이 페이지로 증명할 수 없다.','기본 요소→프로젝트 적용 화면→변경 속성/이유가 빠졌다. 보강 전에는 제목을 현재 보이는 입력 UI로 줄인다.','당시 적용 자료로 확인 후 추가라는 편집 지시를 제출본에서 지운다.','outline:none이 보이지만 일부 상태 코드 캡처다. 전체 포커스 스타일이 있는지 확인 후 실제 키보드 포커스를 점검한다. 접근성 충족을 단정하지 않는다.'],
 '입력 상태 가이드 60%, 관련 SCSS 40%. 적용 자료가 확보되면 기본/변형 두 UI와 실제 변경 치수 하나를 같은 기준으로 비교한다.',
 '기본 요소에서 무엇을 얼마나 바꿨고 그 이유는 무엇인가요?',priority='필수')
add(23,'공통 UI','검색 UI의 상태와 사용 예시를 가이드로 정리했습니다.','매일 반복되는 종이 서류는 단순한 불편함을 넘어 법적 리스크와 관리 비용을 증대시켰습니다.',
 '검색 입력의 상태와 배치 예시를 정리했습니다.',
 '기본·포커스·입력 중·비활성 상태를 구분하고 검색 입력의 배치 예시를 웹 가이드에 정리했습니다. 상태 이름과 예시 설명을 실제 화면에 맞춰 작성했습니다.',
 [B('상태 구분','기본 · 포커스 · 입력 중 · 비활성'),B('가이드 구성','검색 입력의 상태별 모양\n검색창을 화면 안에 배치하는 예시'),B('담당 범위','파운데이션 · 컴포넌트 · 사용 가이드 설계')],
 ['본문에 종이 서류 문제를 반복하지 않는다. 검색 상태와 배치 예시로 교체한다.','검색 중(searching) 화면은 문자열과 지우기 버튼이 보인다. 실제 요청 중/로딩 표시가 없으므로 입력 중으로 이름을 바꾼다. 경고 상태는 보이지 않아 하단 캡션에서 삭제한다.','이렇게 써요/이렇게 쓰지 않아요 아래 설명이 완전히 같다. 차이는 주로 카드 경계와 그림자 표현처럼 보이지만 실제 의도는 확인이 필요하다.','명확한 금지 이유가 없으면 Do/Don’t를 빼고 배치 예시로 통합한다. 같은 내용으로 적절/부적절을 나누지 않는다.','disable→disabled로 표기한다. 한글 기본/포커스/입력 중/비활성으로 통일해도 된다.'],
 '왼쪽 상태 4개, 오른쪽 검색 입력 배치 예시 1개. 그림자 지침은 실제 차이가 보이는 새 예시와 이유가 있을 때 추가한다.',
 '입력 중과 검색 처리 중은 어떤 상태 차이가 있나요?',priority='필수')
add(24,'추가 경험','디자이너 팀이 기획·디자인·퍼블리싱한 모바일 인트라넷','제목 아래 설명문 없음',
 '회의실 예약과 근태 신청을 모바일 화면으로 설계했습니다.',
 '디자이너 팀에서 모바일 인트라넷의 기획·UI·퍼블리싱에 참여했습니다. 회의실 현황에서 예약으로, 전자결재 현황에서 근태 신청으로 이어지는 화면을 구성했습니다.',
 [B('회의실 예약','공간 현황 확인 → 예약일·시간·목적 입력'),B('전자결재·근태 신청','문서 상태 확인 → 근태 종류·일자·사유 입력'),B('프로젝트 상태','미배포 · 디자이너 팀 내부 설계·구현 확인')],
 ['미배포·팀 내부 확인 상태를 명시한 것은 적절하다. 설명문을 추가해 두 흐름을 쉽게 소개한다.','팀 경험과 본인 담당이 분리되지 않는다. 본인이 설계/퍼블리싱한 화면·공통 기준을 실제 범위대로 표시한다.','겹친 UI 때문에 뒤 화면의 주요 항목이 가려진다. 현황→입력 화면을 나란히 배치한다.','현재 UI의 결재선 표기를 다시 확대 확인한다. 이전 오타 결제선이 남아 있으면 원본 UI에서 고친다. 승인·반려 전체 흐름을 보여준 것으로 확대 해석하지 않는다.'],
 '회의실 현황→입력 / 전자결재 현황→근태 입력의 2개 흐름. 4개 화면을 평면으로 배치하되 핵심 부분만 확대한다.',
 '팀 작업 중 본인이 만든 화면과 팀원이 만든 화면은 어떻게 나뉘나요?',priority='중요')
add(25,'추가 경험','이미지·제목·작업 단계로 업무를 구분하는 개인 칸반 프로토타입','매일 반복되는 종이 서류는 단순한 불편함을 넘어 법적 리스크와 관리 비용을 증대시켰습니다.',
 '카드 이동과 작업 생성을 구현한 개인 칸반 프로토타입',
 '이미지와 제목으로 작업을 구분하는 보드 UI를 설계했습니다. AI의 도움을 받아 카드 이동과 작업 입력을 구현했으며, 실제 사용자 평가는 진행하지 않았습니다.',
 [B('칸반 보드','카드의 이미지·제목으로 작업 구분\n카드 이동 인터랙션 구현'),B('작업 생성','제목 · 설명 · 담당자 · 상태 · 일정 입력'),B('수행 범위','개인 UX/UI 설계 · AI 보조 구현\n시연 데이터 사용 · 사용자 평가 미실시')],
 ['제목 아래 종이 서류 문구를 개인 설계·구현 범위로 교체한다.','보드의 컬럼은 디자인/퍼블리싱/개발/QA/test로 작업 분야와 상태가 섞여 있다. 현재 화면을 작업 단계 분류가 검증된 사례로 소개하지 않는다.','test:1·sss·ddddd 등 데이터가 남았다. 의미 있는 시연 작업으로 바꾸고 실제 앱에서 다시 캡처한다.','오른쪽은 작업 생성으로 정확히 바뀌었다. 작업 상세 편집으로 되돌리지 않는다.','AI 보조 구현은 보조 역량이다. 배포 실무보다 크게 소개하지 않고 실제 본인 결정과 기능 확인을 설명한다.'],
 '보드 전체를 크게 쓰기보다 의미 있는 카드 2–3개와 작업 생성 모달을 확대한다. 제목·담당·상태·일정이 같은 시연 작업으로 연결되게 한다.',
 'AI가 작성한 코드에서 본인이 결정하고 직접 확인한 부분은 무엇인가요?',priority='필수')
add(26,'연락처','업무 구조와 UI를 함께 설계할 팀을 찾고 있습니다.','포트폴리오에 대해 이야기 나누고 싶다면 연락주세요.',
 '업무 구조와 UI를 함께 설계할 팀을 찾고 있습니다.',
 'B2B 업무 서비스의 정보 구조·UX/UI·퍼블리싱 경험을 바탕으로 제품의 사용 흐름을 함께 만들고 싶습니다. 프로젝트의 담당 범위와 설계 과정은 면접에서 자세히 말씀드리겠습니다.',
 [B('이한울','UX/UI · Product Designer'),B('이메일','hanul.designer@gmail.com'),B('전화','010-9271-8997'),B('웹 포트폴리오','https://hanul-lee.github.io/web/index.html')],
 ['마지막 문장은 지원 방향과 연결된다. 이메일이 빠지고 이메일 아이콘 옆에 웹 주소가 있다. 이메일/전화/웹을 각각 구분한다.','URL을 나열하는 것과 클릭 가능한 링크는 다르다. PDF 내보내기 후 실제 링크를 점검한다.','웹 주소는 이번 외부 읽기에서 접근되지 않았다. 주소 오류를 확정하지 않고 직접 브라우저와 모바일에서 열리는지 확인할 항목으로 남긴다.','연락주세요→연락 주세요처럼 띄어쓰기를 정리한다.'],
 '제목 2줄 이내, 소개 2줄. 이메일을 먼저 크게 배치하고 전화/웹을 그 아래. 실제 링크를 걸고 아이콘은 의미에 맞춘다.',
 '다음 팀에서 가장 맡고 싶은 제품 문제는 무엇인가요?',priority='필수')
assert len(P)==26
(ROOT/'revision-data.json').write_text(json.dumps(P,ensure_ascii=False,indent=2))
# All crops are visual excerpts of the user supplied 1010 pages. They are never invented UI.
crops={
'platform':(7,118,277,1032,718), 'menu':(6,1051,528,698,177),
'menu-a':(8,182,738,440,67),'menu-b':(8,792,739,335,65),'menu-c':(8,1363,736,366,70),
'platform-detail':(9,1177,607,625,345),
'home-tbm':(11,1355,139,334,720),'form-tbm':(13,670,318,291,618),
'sign-input':(14,368,318,290,616),'sign-complete':(14,1268,318,284,616),
'erp':(17,1013,493,763,280),'erp-menu':(19,233,366,318,272),'erp-sum':(19,233,655,318,130),
'color-code':(21,148,368,630,405),'color-guide':(21,1310,377,459,386),
'input-code':(22,148,368,630,405),'input-guide':(22,1298,375,476,385),
'search-states':(23,214,410,478,305),'search-layout':(23,928,443,344,159),
'intranet-booking':(24,263,355,287,450),'intranet-approval':(24,1131,355,280,450),
'kanban':(25,148,368,762,421),'task-create':(25,1326,396,207,387),
'guide-home':(20,851,120,758,618)
}
(ROOT/'evidence').mkdir(exist_ok=True)
for name,(n,x,y,w,h) in crops.items():
 subprocess.run(['sips','-c',str(h),str(w),'--cropOffset',str(y),str(x),str(ROOT/f'source/{n:02}.png'),'--out',str(ROOT/f'evidence/{name}.png')],capture_output=True,check=True)
(ROOT/'crop-manifest.json').write_text(json.dumps(crops,ensure_ascii=False,indent=2))
if not (ROOT/'fonts').exists(): shutil.copytree(ROOT.parents[1]/'assets/fonts',ROOT/'fonts')
# source provenance: images are copied without modifying originals
manifest=[]
for n in range(1,27):
 src=Path('/Users/ihan-ul/Downloads/1010')/f'{n:02}.png';copy=ROOT/f'source/{n:02}.png'
 h=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
 assert h(src)==h(copy)
 manifest.append(dict(page=n,source=str(src),sha256=h(src),size=src.stat().st_size))
(ROOT/'source-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
print('26-page data, original provenance, crops and fonts ready')
for name,y in [('search-default',413),('search-focus',495),('search-typing',579),('search-disabled',663)]:
 subprocess.run(['sips','-c','61','341','--cropOffset',str(y),'214',str(ROOT/'source/23.png'),'--out',str(ROOT/f'evidence/{name}.png')],capture_output=True,check=True)
P[23]['issues'][3]='확대한 현재 화면에서 결재선 표기가 올바르게 수정된 것을 확인했다. 이 수정은 유지한다. 승인·반려 전체 흐름을 보여준 것으로 확대 해석하지 않는다.'
(ROOT/'revision-data.json').write_text(json.dumps(P,ensure_ascii=False,indent=2))
E=lambda s:html.escape(str(s))
SOURCES=[('토스플레이스 · Product Designer','https://toss.im/career/job-detail?job_id=5425438003','문제 정의와 선택 근거, 본인 기여·결과, 정보 위계와 UI 완성도'),('다솜엑스 · Product Designer / UI·UX','https://www.dasomx.com/ko_KR/jobs/product-designer-uiux-%EB%94%94%EC%9E%90%EC%9D%B4%EB%84%88-3','설계 의도의 논리적 설명, 컴포넌트 기반 설계, 개발자·PM 협업'),('토스플레이스 · Visual Designer (Design System)','https://toss.im/career/job-detail?job_id=6255627003','UI 패턴의 체계화, 기기별 사용성, 실제 도입을 이끄는 협업. 공통 UI 사례 검토의 보조 기준')]
INTRO='''# 1010 포트폴리오 재검토 및 페이지별 수정 원고

검토일: 2026-10-10 (한국 시간). 대상: `/Users/ihan-ul/Downloads/1010/01.png–26.png`. 이전 1009의 36쪽이나 웹 PDF를 이번 원본으로 사용하지 않았다. 26쪽을 직접 보며 제목·설명·화면·캡션을 대조했다. 작은 UI는 필요한 부분을 확대 확인했다.

## 판단: 방향은 좋아졌지만 현재본은 제출 전 수정이 필요하다

B2B 업무 UI의 정보 구조, 실제 배포된 두 서비스, 퍼블리싱과 공통 컬러 재사용이 연결된다. 이 강점을 중심으로 지원하는 방향은 맞다. 그러나 설명문 복사 오류, 남은 편집 지시, 상태 명칭과 증거의 불일치가 완성도를 낮춘다. 현재 상태로는 면접관에게 ‘업무 경험은 있으나 최종 검수와 근거 정리가 부족하다’는 인상을 줄 수 있다.

이는 실제 채용 결정이나 합격 확률이 아닌, 자료만 보고 내린 검토 판단이다. 문구 수정으로 편집 완성도는 개선할 수 있지만 협업의 구체적인 사례와 실제 적용 증거는 원자료가 있어야 보강된다. 합격 여부·연봉·특정 회사 적합성을 이 포트폴리오만으로 보장할 수는 없다.

### 채용 관점별 읽힘

| 관점 | 지금 읽히는 강점 | 서류에서 망설일 이유 | 수정 후 확인할 것 |
|---|---|---|---|
| 처음 보는 사람 | B2B 업무 서비스를 다뤘다는 점 | TBM·GSIM 등 용어, 길고 반복되는 문장 | 제목+설명만 보고 각 페이지의 목적을 설명할 수 있는가 |
| UX/UI 실무 채용 | 대시보드·모바일 입력·상태 설계, 퍼블리싱 | 중복 설명·작은 비교 UI·상태 캡션 오류 | 실제 화면과 설명이 맞고 50% 축소에서도 핵심이 읽히는가 |
| B2B 프로덕트 채용 | 서로 다른 업무 목적 정리, 메뉴 대안, 배포 경험 | 문제 출처·선택의 제약·협업 한 건·배포 후 확인이 얕음 | 문제→선택→담당 UI→실제 활용을 한 사례로 연결할 수 있는가 |
| 데이터·실험 중심 직무 | 배포된 실무 두 사례 | 사용자 관찰·측정·반복 개선 자료 부족 | 실제 수행한 검증 자료가 있는가. 현재 자료를 실험 성과로 포장하지 않는가 |
| 디자인 시스템 전문 직무 | 실제 SCSS 정의와 입력 가이드 | 참조 코드·적용 UI·팀 도입 범위가 부족 | 토큰 정의→스타일 참조→적용 화면이 같은 실제 사례로 이어지는가 |

이 판단은 2026-10-10에 읽을 수 있었던 아래 공개 공고의 요구를 참고했다. 공고의 게시일이나 채용 지속 여부를 확정한 것이 아니며 국내 모든 회사의 공통 기준으로 일반화하지 않는다. 전문 디자인 시스템 직무의 요구는 현재 지원자의 공통 UI 재사용 경험과 구분한다.

'''+''.join(f'- [{t}]({u}): {d}.\n' for t,u,d in SOURCES)+'''
### 이번 수정에서 좋아진 점

- 대표 실무가 통합 플랫폼→TBM 순서로 배치되고 배포·실사용 상태가 명확해졌다.
- 06쪽의 메뉴 구조, 07쪽의 화면 번호, 08쪽의 대안 비교가 실제 화면과 연결됐다.
- ERP의 최종 웹 미사용, 인트라넷의 미배포, 칸반의 사용자 평가 미실시를 구분했다.
- 공통 UI에서 실제 SCSS 자료가 추가됐고 일부 요소 재사용으로 범위를 좁혔다.
- 24쪽 UI의 결재선 오타가 수정됐다. 25쪽 작업 생성 캡션도 화면에 맞게 바뀌었다.

### 제출 전에 먼저 고칠 부분

1. **12쪽 ERP 문구 삭제**, **13·14·17·18·19·21·22·23·25쪽 종이 서류·법적 리스크 반복 문구 삭제**. 각 페이지 설명은 아래 원고로 교체한다.
2. **02쪽 특허번호·사이트명·기간·출처의 미완성 표기**, **06·19·22쪽 편집 지시**를 제거한다. 원자료 없이 채울 수 없는 성과는 수정 초안에서 생략했다.
3. **06쪽 탭과 하위 메뉴 대응**을 바로잡는다. 현재 확대 화면은 현장설명 탭이 활성화돼 있다.
4. **10쪽 Before/After→본인 산출물/확인된 활용**, **17쪽 적용 후→웹 설계안**, **21쪽 실제 적용 코드→컬러 변수 정의와 웹 가이드**로 바꾼다.
5. **23쪽 경고 상태 삭제**, **searching→입력 중**, **동일한 Do/Don’t 설명 정리**. 원본 UI의 상태 라벨은 원본 디자인에서도 바꾼다.
6. **12·17쪽 실명·서명·회사/현장 정보 익명화**. **25쪽 test·sss·ddddd 데이터 교체 후 실제 앱에서 재캡처**.
7. **13쪽 UI 날짜와 11쪽 작업 기간 관계 확인**, **26쪽 이메일 추가와 아이콘 의미 수정**, 최종 PDF에서 클릭 링크 확인.

### 문장만 고쳐서는 채울 수 없는 증거

| 위치 | 지금 있는 자료 | 보강하면 좋은 실제 자료 | 없어도 쓸 수 있는 범위 |
|---|---|---|---|
| 05 | 사용자 유형과 본인 업무 설명 | 실제 업무 자료 1건 또는 당시 요청서 | 업무 설명과 설계 과제 |
| 06–09 | 메뉴·지도·대안 화면 | 탭별 실제 메뉴, 자료 선택 이후 화면 | 현재 보이는 정보 구조와 진입점 |
| 10 | 역할·실사용 문장 | 협업 요청→제약→본인 판단→변경 화면 한 건 | 본인 산출물과 활용 범위 |
| 13–15 | 일지·서명·배포 상태 | 작성하기 이후 단계, 실제 요청/수정 기록 | 현재 두 흐름과 개발자를 통한 의견 전달 |
| 19 | UI와 기준 공유 문장 | 같은 ERP의 전달 문서나 메시지 | UI 설계·퍼블리싱·공유 범위 |
| 21 | 컬러 변수 정의와 컬러 가이드 | 토큰을 참조한 실제 스타일+적용 UI | 컬러 토큰 정의, 본인 설명에 근거한 재사용 |
| 22 | 입력 SCSS와 상태 예시 | 기본/적용 UI·변경 치수·변경 이유 | 입력 가이드와 일부 요소 사용 경험 |
| 24 | 팀 내부 결과 화면 | 본인 제작 화면·코드 범위 | 팀 설계 참여와 미배포 상태 |

추가 자료를 만들 때는 실제 수행 날짜와 범위를 적는다. 지금 새로 하는 점검이나 사용성 테스트를 과거 프로젝트 당시 수행한 것으로 쓰지 않는다. 기억나지 않는 사용자 발언을 직접 인용으로 만들지 않는다.

### 레이아웃을 다듬는 작업 기준

1920×1080은 유지한다. 상세 페이지는 좌우 120px, 제목 52–60px·최대 2줄, 설명 28–32px·최대 2줄, 주요 증거 y=340–940을 기준으로 조정한다. 이는 이번 문서의 편집 기준이며 채용 합격 기준은 아니다. 본문은 왼쪽 정렬을 기본으로 하고, 긴 문장을 가운데 정렬한 큰 상자를 줄인다. 화면은 설명하는 부분을 확대하고 전체 캡처와 구분한다. 상세 페이지 배경은 밝게 통일하면 프로젝트 간 비교가 쉬워진다. 표지의 개별 분위기는 유지해도 된다.

26쪽을 다시 늘리지 않는다. 공통 UI의 실제 재사용 자료를 확보하지 못한다면 21–22를 한 쪽으로 합치고 남는 한 쪽에 협업 증거를 넣는 대안이 있다. 기본 수정안은 기존 26쪽을 유지해 페이지 대응이 끊기지 않도록 했다.

## 26쪽 교체 원고

각 페이지의 ‘교체 원고’는 제출 문구이고, ‘검토 메모·배치·질문’은 편집 참고다. 두 영역을 제출본에 함께 붙여 넣지 않는다. 제목 아래 설명은 01–26 전체에 새로 제공했다. 원본이 PNG이므로 원본 디자인 파일의 텍스트를 교체한 뒤 다시 내보내야 한다.
'''
md=[INTRO]
for p in P:
 md.append(f"\n### {p['n']:02} · {p['group']} · {p['priority']}\n\n현재 제목: {p['current']}\n\n현재 제목 아래: {p['old_desc']}\n\n**교체 제목**\n\n"+'\n'.join('> '+s for s in p['title'].split('\n'))+"\n\n**제목 아래 설명**\n\n> "+p['desc']+"\n\n**본문·캡션**\n")
 for b in p['blocks']:md.append('\n> '+b['title']+'\n> '+b['text'].replace('\n','\n> ')+'\n')
 md.append('\n**검토 메모**\n\n'+'\n'.join('- '+x for x in p['issues'])+f"\n\n**배치 수정:** {p['layout']}\n\n**면접 질문:** {p['question']}\n")
md.append('''
## 수정 후 면접에서 확인할 질문과 답변 구조

먼저 프로젝트 목적을 한 문장으로 말하고, 본인이 만든 UI를 가리켜 역할을 설명한다. 이어서 선택 이유와 제약, 배포/사용 범위, 아직 확인하지 못한 부분을 말한다.

- **플랫폼은 무엇이 달라졌나요?** 파일·프로그램별로 나뉜 자료를 업무별 공통 메뉴와 지도 중심 화면에서 찾도록 설계했다. 정보 구조·UI·퍼블리싱을 담당했고 배포 후 실제 이용이 있었다. 시간 단축 수치를 측정했다는 자료는 현재 없다.
- **TBM에서 왜 웹과 모바일을 나눴나요?** 웹은 기록 보관·판독 문제에 대응하는 입력 환경, 모바일은 현장 작성 환경을 목표로 했다. 실제 일지 화면과 마이페이지 서명 저장 흐름을 나눠 보여준다.
- **ERP가 미사용이면 의미가 있나요?** 조회 범위·정보 위계·상태 표현과 퍼블리싱 경험을 설명할 수 있다. 제공 방식이 PDF로 바뀌어 웹 설계안이 최종 사용되지 않았다는 사실을 함께 말한다.
- **디자인 시스템을 구축한 건가요?** 컬러 토큰과 웹 가이드, 일부 입력 요소를 정리하고 디자인·프론트 작업에서 사용했다. 조직 전체 채택이나 운영 규모는 현재 증거가 없다. 실제 참조 코드와 적용 화면이 있다면 이어서 제시한다.
- **사용자 피드백으로 무엇을 개선했나요?** TBM은 개발자를 통해 의견을 전달받았지만 상세 내용은 현재 자료로 특정할 수 없다. 실제 기록이 발견되면 그 한 건만 설명한다. 개선 효과를 새로 만들어 말하지 않는다.

## 최종 제출 확인

- 전체 26쪽의 제목·설명·이미지·캡션이 같은 내용을 설명한다.
- 편집 지시와 대괄호 채움 문구가 없다.
- 핵심 두 사례를 문제→선택→본인 UI→실제 활용의 순서로 설명할 수 있다.
- 종이 일지와 ERP 원자료의 식별 정보를 익명화했다.
- 코드 정의, 가이드, 프로젝트 적용 화면의 이름을 정확히 구분했다.
- 칸반 시연 데이터를 실제 앱에서 교체하고 다시 캡처했다.
- 최종 PDF에서 50% 축소 읽기, 넘침, 폰트, 목차·연락처 링크를 확인했다.
- 새 HTML의 기술 점검 결과와 최종 제출 PDF의 검증을 구분한다. PNG만으로 원본 PDF의 링크나 실제 서비스 동작을 검증하지 못한다.

## 파일 사용 방법

`1010_원본과수정안.html`: 원본 PNG, 수정 원고, 검토 이유, 배치 지시, 면접 질문을 함께 보는 검토 화면.

`1010_수정원고_레이아웃.html`: 교체 문구를 실제 UI 부분 확대와 함께 배치한 26쪽 설명용 초안. 상단에서 페이지 이동·인쇄 가능. 12·17쪽 원자료는 식별 정보를 포함하지 않은 항목 요약으로 대체했다. 21·22쪽은 현재 증거 수준에 맞춘 구성이다. 25쪽 화면의 테스트 데이터는 원본에 남아 있으므로 최종 제출 전 재캡처가 필요하다.

이 초안은 2026.10 포트폴리오 설명용 재구성이다. 기존 원본 디자인이나 실제 앱을 수정한 결과는 아니다. 개인정보 익명화·자료 보강·날짜 확인·시연 데이터 재캡처 후 제출본으로 편집한다. 모든 원본은 source 폴더에 그대로 보존했고 원본 해시를 대조했다.
''')
(ROOT/'1010_재검토_텍스트수정안.md').write_text(''.join(md))
# UI evidence configuration for each proposed page
visuals={1:['platform-detail'],4:['platform-detail'],6:['menu'],7:['platform'],8:['menu-a','menu-b','menu-c'],9:['platform-detail'],11:['home-tbm'],13:['form-tbm'],14:['sign-input','sign-complete'],16:['erp'],17:['erp'],18:['erp-menu'],19:['erp-menu','erp-sum'],20:['guide-home'],21:['color-code','color-guide'],22:['input-guide','input-code'],23:['search-default','search-focus','search-typing','search-disabled','search-layout'],24:['intranet-booking','intranet-approval'],25:['kanban','task-create']}
alts={'platform-detail':'지도와 시뮬레이션 UI 부분 확대','platform':'지도·업무 메뉴·시뮬레이션 선택 UI 부분 확대','menu':'현재 현장설명 탭이 선택된 공통 메뉴 부분 확대','menu-a':'A 흰색 메뉴 부분 확대','menu-b':'B 검정 메뉴 부분 확대','menu-c':'C 반투명 검정 메뉴 부분 확대','home-tbm':'현장 안전 기록 서비스 홈 UI 부분 확대','form-tbm':'작성일·출역 인원·확인 상태·작성하기 UI','sign-input':'마이페이지 서명 변경 UI','sign-complete':'서명 저장 완료 메시지','erp':'웹 ERP 대시보드 설계안 부분 확대','erp-menu':'활성 메뉴 UI 부분 확대','erp-sum':'비용 항목과 합계 UI 부분 확대','color-code':'실제 SCSS 컬러 변수 정의','color-guide':'컬러 웹 가이드','input-code':'읽기 전용·편집 입력 관련 SCSS','input-guide':'입력 상태 가이드','search-default':'검색 입력 기본 상태','search-focus':'검색 입력 포커스 상태','search-typing':'검색 입력 중 상태','search-disabled':'검색 입력 비활성 상태','search-layout':'검색 입력 배치 예시','intranet-booking':'회의실 현황과 예약 입력 UI','intranet-approval':'전자결재 현황과 근태 신청 UI','kanban':'현재 칸반 시연 화면; 테스트 데이터 수정 필요','task-create':'작업 생성 모달 UI','guide-home':'현재 공통 UI 웹 가이드 홈 부분 확대'}
footnotes={6:'현재 캡처의 탭: 현장설명 · 탭별 전체 메뉴는 원본 확인 후 보강',8:'당시 화면은 메뉴 구성·활성 상태가 다릅니다. 시각 검토에 따른 선택입니다.',12:'기존 기록 항목 요약 · 제출용 종이 일지 이미지는 익명화 후 교체',13:'현재 UI 날짜 2025.10.30 · 작업기간과의 관계 확인 필요',14:'마이페이지 서명 변경 화면 · 입력과 성공 상태',17:'기존 항목과 웹 설계안의 정보 배치 비교 · 웹 설계안 최종 미사용',19:'9/8h와 초과 1시간은 화면의 예시값 · 웹 설계안 최종 미사용',21:'현재 증거: 컬러 변수 정의 + 웹 가이드 · 실제 스타일 참조 자료는 보강 필요',22:'현재 증거: 입력 가이드 + 일부 SCSS · 크기 조정 적용 UI는 보강 필요',23:'현재 UI에서 보이는 네 상태 · 원본 가이드의 상태 라벨도 수정 필요',24:'팀 내부 설계·구현 확인 · 미배포',25:'시연 데이터 · 사용자 평가 미실시 · test/sss/ddddd는 재캡처 전 수정 필요'}
css='''*{box-sizing:border-box}html{color:#18212b;font-family:"Noto Sans KR","Apple SD Gothic Neo","Malgun Gothic",sans-serif}body{margin:0;background:#e8ecf2}a{color:inherit}.toolbar{padding:14px 24px;display:flex;gap:14px;align-items:center;flex-wrap:wrap;background:#fff;position:sticky;top:0;z-index:9;border-bottom:1px solid #d7deea;font-size:14px}.toolbar button,.toolbar select{font:inherit;padding:9px 13px;border-radius:7px;border:1px solid #aeb9c9;background:#fff;cursor:pointer}.toolbar label{display:flex;gap:8px;align-items:center}.draft{margin:20px auto;max-width:1200px;padding:16px 22px;background:#fff7df;border:1px solid #e4c97e;line-height:1.8;font-size:15px}.draft p{margin:0}.viewport{position:relative;overflow:hidden;margin:24px auto;max-width:1920px}.slide{position:relative;width:1920px;height:1080px;padding:65px 120px 85px;background:#f7f8fa;transform-origin:top left;--accent:#245bdb}.slide.g-intro{--accent:#245bdb}.slide.g-platform{--accent:#ba470b}.slide.g-tbm,.slide.g-erp{--accent:#4054cf}.slide.g-ui{--accent:#1e5149}.slide.g-extra{--accent:#245bdb}.slide.top-cover{background:#141d31;color:#fff}.slide>header{display:flex;justify-content:space-between;gap:30px;font-size:24px;line-height:1.4;color:var(--accent);margin-bottom:45px}.top-cover>header{color:#9faed6}.slide h1{font-size:54px;line-height:1.42;margin:0 0 23px;white-space:pre-line;word-break:keep-all;overflow-wrap:anywhere;letter-spacing:-1.3px;max-width:100%}.slide .desc{font-size:29px;line-height:1.65;margin:0 0 40px;max-width:1640px;color:#454e5b;word-break:keep-all;overflow-wrap:anywhere}.top-cover .desc{color:#c8d0e0}.slide-main{display:grid;grid-template-columns:1fr 1.25fr;gap:44px;height:590px}.slide-main.cards-only{grid-template-columns:repeat(3,1fr)}.slide.n-3 .slide-main.cards-only{grid-template-columns:repeat(2,1fr)}.copy-stack{display:flex;flex-direction:column;gap:18px;min-height:0}.copy-card{border:1px solid #dbe0e8;border-radius:15px;background:#fff;padding:24px 28px}.top-cover .copy-card{background:#202e49;border-color:#3f506e}.copy-card h2{margin:0 0 12px;font-size:30px;line-height:1.5;color:var(--accent)}.top-cover .copy-card h2{color:#a7befc}.copy-card p{font-size:27px;line-height:1.65;margin:0;white-space:pre-line;word-break:keep-all;overflow-wrap:anywhere}.cards-only .copy-card{height:max-content;min-height:230px}.visuals{display:flex;gap:24px;justify-content:center;align-items:center;min-width:0;height:100%;padding:22px;border:1px solid #dbe0e8;border-radius:16px;background:#fff}.visuals figure{margin:0;display:flex;flex:1;flex-direction:column;align-items:center;gap:14px;min-width:0;height:100%;justify-content:center}.visuals img{max-width:100%;max-height:520px;object-fit:contain}.visuals figcaption{font-size:22px;line-height:1.5;color:#555f6c;text-align:center;word-break:keep-all}.slide.n-7 .slide-main{grid-template-columns:.7fr 1.45fr}.slide.n-7 .visuals img{max-height:530px}.slide.n-8 .slide-main{display:flex;flex-direction:column;gap:22px}.slide.n-8 .copy-stack{display:grid;grid-template-columns:repeat(3,1fr);order:2}.slide.n-8 .visuals{height:245px;order:1}.slide.n-8 .visuals img{width:100%;max-height:145px}.slide.n-14 .slide-main{grid-template-columns:.8fr 1.5fr}.slide.n-21 .slide-main,.slide.n-22 .slide-main{grid-template-columns:.75fr 1.5fr}.slide.n-21 .visuals img,.slide.n-22 .visuals img{max-height:460px}.slide.n-23 .slide-main{grid-template-columns:.65fr 1.55fr}.slide.n-23 .visuals{display:grid;grid-template-columns:1fr 1fr;gap:10px}.slide.n-23 .visuals figure{height:auto}.slide.n-23 .visuals figure:last-child{grid-column:1/-1;max-height:210px}.slide.n-23 .visuals img{max-height:115px}.slide.n-23 .visuals figure:last-child img{max-height:155px}.slide.n-25 .visuals figure:first-child{flex:1.5}.slide.n-25 .visuals img{max-height:450px}.slide.n-26 .slide-main.cards-only{grid-template-columns:1fr 1.7fr}.slide.n-26 .copy-card p{font-size:26px}.slide>footer{position:absolute;bottom:38px;left:120px;right:120px;display:flex;align-items:center;justify-content:space-between;gap:25px;font-size:19px;line-height:1.5;color:#596270;border-top:1px solid #dbe0e8;padding-top:16px}.top-cover>footer{color:#acb8cf;border-color:#34435e}.all-slides .viewport{display:block!important}.viewport[hidden]{display:none}.evidence-note{font-size:21px;line-height:1.6;color:#596270;margin-top:16px}.top-cover .evidence-note{color:#acb8cf}:focus-visible{outline:3px solid #245bdb;outline-offset:4px}@page{size:508mm 285.75mm;margin:0}@media print{body{background:#fff}.toolbar,.draft{display:none}.viewport{display:block!important;position:relative;width:1920px!important;height:1080px!important;margin:0;max-width:none;break-after:page}.viewport:last-child{break-after:auto}.slide{transform:none!important;zoom:1!important}.slide{print-color-adjust:exact;-webkit-print-color-adjust:exact}}'''
parts=[]
for p in P:
 n=p['n'];group='intro' if n<=3 or n==26 else 'platform' if n<=10 else 'tbm' if n<=15 else 'erp' if n<=19 else 'ui' if n<=23 else 'extra'
 cards=''.join('<article class="copy-card"><h2>'+E(b['title'])+'</h2><p>'+E(b['text'])+'</p></article>' for b in p['blocks'])
 if n==26:
  cards=cards.replace(E('hanul.designer@gmail.com'),'<a href="mailto:hanul.designer@gmail.com">hanul.designer@gmail.com</a>').replace(E('010-9271-8997'),'<a href="tel:+821092718997">010-9271-8997</a>').replace(E('https://hanul-lee.github.io/web/index.html'),'<a href="https://hanul-lee.github.io/web/index.html">hanul-lee.github.io/web</a>')
 keys=visuals.get(n,[])
 images=''.join('<figure><img src="evidence/'+k+'.png" alt="'+E(alts[k])+'"><figcaption>'+E(alts[k])+'</figcaption></figure>' for k in keys)
 main=('<div class="copy-stack">'+cards+'</div><div class="visuals">'+images+'</div>') if keys else cards
 parts.append(f'<div class="viewport" id="page-{n:02}"><section class="slide g-{group} n-{n} '+('top-cover' if n in [1,26] else '')+f'" aria-labelledby="title-{n}"><header><span>이한울 · {E(p["group"])}</span><span>{n:02} / 26</span></header><h1 id="title-{n}">{E(p["title"])}</h1><p class="desc">{E(p["desc"])}</p><main class="slide-main '+('' if keys else 'cards-only')+f'">{main}</main>'+ ('<p class="evidence-note">'+E(footnotes[n])+'</p>' if n in footnotes else '')+f'<footer><span>2026.10 포트폴리오 설명용 재구성 · 현재 UI 부분 확대</span><a href="#page-03">목차 · 03</a></footer></section></div>')
options=''.join(f'<option value="{p["n"]}">{p["n"]:02} · {E(p["group"])} · {E(p["title"].replace(chr(10)," "))}</option>' for p in P)
js='''const pages=[...document.querySelectorAll('.viewport')],select=document.querySelector('#page-select'),all=document.querySelector('#all');let current=1;function scale(){for(const wrap of pages){const s=wrap.clientWidth/1920;wrap.style.height=(1080*s)+'px';wrap.querySelector('.slide').style.transform='scale('+s+')';}}function show(n){current=Math.max(1,Math.min(26,Number(n)));select.value=current;pages.forEach((p,i)=>p.hidden=!all.checked&&i+1!==current);history.replaceState(null,'','#page-'+String(current).padStart(2,'0'));document.querySelector('#status').textContent=current+' / 26';scale();}select.onchange=()=>show(select.value);all.onchange=()=>show(current);document.querySelector('#prev').onclick=()=>show(current-1);document.querySelector('#next').onclick=()=>show(current+1);document.querySelector('#print').onclick=()=>window.print();document.addEventListener('keydown',e=>{if(e.target.closest('input,select,button,a'))return;if(e.key==='ArrowRight')show(current+1);if(e.key==='ArrowLeft')show(current-1);});window.addEventListener('resize',scale);window.addEventListener('hashchange',()=>show(Number(location.hash.slice(-2))||1));document.querySelectorAll('.slide footer a').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();show(3)}));document.fonts.ready.then(scale);show(Number(location.hash.slice(-2))||1);'''
(ROOT/'1010_수정원고_레이아웃.html').write_text('<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>1010 수정 원고 · 26쪽 레이아웃 초안</title><link rel="stylesheet" href="fonts/fonts.css"><style>'+css+'</style></head><body><nav class="toolbar" aria-label="페이지 이동"><a href="1010_원본과수정안.html">검토·비교로 돌아가기</a><button id="prev">← 이전</button><span id="status" aria-live="polite"></span><button id="next">다음 →</button><label>페이지<select id="page-select">'+options+'</select></label><label><input id="all" type="checkbox" checked>전체 보기</label><button id="print">인쇄 / PDF 저장</button></nav><aside class="draft"><p><strong>2026.10 설명용 재구성 · 제출 전 편집이 필요한 초안</strong></p><p>교체 문구와 현재 UI를 배치했습니다. 12·17쪽 원자료는 항목 요약으로 대체했습니다. 21·22쪽 적용 증거, 13쪽 날짜, 25쪽 시연 데이터는 추가 확인·수정이 필요합니다. 원본 PNG나 실제 앱을 수정한 파일은 아닙니다.</p></aside>'+''.join(parts)+'<script>'+js+'</script></body></html>')
print('manuscript and 26-slide HTML built')
report_css='''*{box-sizing:border-box}html{scroll-behavior:smooth;font-family:"Noto Sans KR","Apple SD Gothic Neo","Malgun Gothic",sans-serif;color:#18212b}body{margin:0;background:#f3f5f9;font-size:16px;line-height:1.8}a{color:#2455c4}header.hero{padding:40px max(24px,4vw);background:#15223b;color:#fff}.hero h1{font-size:32px;line-height:1.5;margin:0 0 16px}.hero p{max-width:1000px;margin:8px 0;color:#d6dfef}.hero a{color:#b8d0ff}.hero .links{display:flex;gap:15px;flex-wrap:wrap;margin-top:22px}.hero .links a{display:inline-block;background:#243b60;padding:10px 16px;border-radius:8px;text-decoration:none}.controls{display:flex;gap:12px;flex-wrap:wrap;align-items:center;padding:14px max(24px,4vw);position:sticky;top:0;background:#fff;border-bottom:1px solid #cdd6e4;z-index:5}button,input,select{font:inherit;padding:9px 12px;border:1px solid #a6b4c8;border-radius:7px;background:#fff}button{cursor:pointer}button:hover{background:#edf2fc}.controls input{width:280px;max-width:100%}.controls label{display:flex;align-items:center;gap:8px}.controls input[type=checkbox]{width:auto}.content{max-width:1600px;margin:auto;padding:30px 32px}.summary,.page-review{background:#fff;border:1px solid #d6dfea;border-radius:12px;padding:26px;margin:0 0 28px}.summary h2,.page-review h2{font-size:24px;line-height:1.5;margin:0 0 15px}.summary h3,.page-review h3{font-size:18px;line-height:1.6;margin:20px 0 10px}.criteria{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.criteria article{padding:18px;background:#edf2f9;border-radius:8px}.criteria article h3{margin-top:0}.criteria p{margin:0}.index{display:flex;gap:8px;flex-wrap:wrap}.index a{border:1px solid #c7d2e5;padding:6px 12px;text-decoration:none;border-radius:6px}.page-review{scroll-margin-top:110px}.badge{display:inline-block;background:#fff0d3;color:#743800;padding:3px 11px;border-radius:5px;font-size:14px;font-weight:700;margin-right:8px}.badge.must{background:#ffe8e6;color:#962922}.pair{display:grid;grid-template-columns:1.1fr 1fr;gap:24px;align-items:start}.original{margin:0;position:sticky;top:110px}.original a{display:block}.original img{display:block;width:100%;height:auto;border:1px solid #dbe0e8;border-radius:8px}.original figcaption{font-size:14px;color:#4f5f72;padding:8px 0}.original details{font-size:14px;background:#f5f7fb;padding:12px;border-radius:6px}.original summary{cursor:pointer}.copy{padding:20px;background:#eff4ff;border:1px solid #c5d4f0;border-radius:9px}.copy .new-title{font-size:23px;line-height:1.55;font-weight:700;white-space:pre-line;margin:0 0 14px}.copy .new-desc{font-size:17px;line-height:1.85;margin:0 0 18px}.copy-block{padding-top:13px;margin-top:13px;border-top:1px solid #c8d7f1}.copy-block h4{font-size:16px;margin:0 0 6px}.copy-block p{margin:0;white-space:pre-line}.copy .copy-btn{margin-top:18px;background:#2455c4;color:white;border-color:#2455c4}.edit-note{margin-top:20px;border-top:1px solid #d7dfeb;padding-top:12px}.edit-note ul{padding-left:23px}.edit-note li{margin:7px 0}.layout,.interview{padding:14px 18px;background:#f6f8fb;border-left:4px solid #5978b0;margin-top:14px}.layout p,.interview p{margin:3px 0}.layout strong,.interview strong{display:block}.page-review[hidden]{display:none}table{width:100%;border-collapse:collapse;table-layout:fixed}td,th{text-align:left;vertical-align:top;border-bottom:1px solid #d5dfec;padding:12px;overflow-wrap:anywhere}th{background:#eff3f9}li{margin:6px 0}.status{font-size:14px;color:#4c5c73}.notice{background:#fff7e3;border-left:4px solid #c18b22;padding:14px 18px}.visually-hidden{position:absolute;clip:rect(0,0,0,0);width:1px;height:1px;overflow:hidden}:focus-visible{outline:3px solid #2455c4;outline-offset:3px}@media(max-width:900px){.pair,.criteria{grid-template-columns:1fr}.original{position:static}.controls{position:static}.content{padding:18px 16px}.summary,.page-review{padding:18px}.hero h1{font-size:25px}.controls input{width:100%}.controls label{width:100%}.controls select{max-width:100%}table{font-size:13px}td,th{padding:7px}.page-review{scroll-margin-top:12px}}@media print{.hero,.controls,.index,.copy-btn{display:none}.content{padding:0}.page-review[hidden]{display:block}.page-review{break-before:page;border:0;padding:0}.original{position:static}.pair{grid-template-columns:1fr 1fr}.summary{border:0}}'''
summary='''<section class="summary" id="overview"><h2>검토 판단: 방향은 좋아졌지만 제출 전 수정이 필요합니다.</h2><p>배포된 두 사례, B2B 정보 구조, 퍼블리싱 경험은 강점입니다. 현재본에는 설명문 복사 오류와 편집 지시가 남고, 일부 캡션이 화면의 증거 범위보다 큽니다. 문구를 맞추면 읽기와 신뢰가 좋아지지만 구체적인 협업·재사용 자료는 추가 보강이 필요합니다.</p><div class="criteria"><article><h3>UX/UI 면접관</h3><p>업무 UI와 구현 경험은 읽힙니다. 반복 문구·작은 비교 화면·상태 라벨 오류를 먼저 정리해야 합니다.</p></article><article><h3>B2B 프로덕트 면접관</h3><p>업무별 정보 구조와 배포 경험이 있습니다. 문제의 출처, 대안 선택의 제약, 실제 협업 한 건이 더 필요합니다.</p></article><article><h3>처음 보는 사람</h3><p>TBM을 현장 안전 점검 일지로 풀고 페이지마다 ‘무엇을 보여주는지’를 설명하면 흐름을 이해하기 쉽습니다.</p></article></div><p>실제 채용 결과나 합격 확률이 아닌 검토 판단입니다. 특정 회사의 합격·연봉을 보장하는 자료는 아닙니다.</p><h3>먼저 고칠 7가지</h3><ol><li>12쪽의 ERP 설명, 13·14·17·18·19·21·22·23·25쪽의 종이 서류 반복 설명을 교체합니다.</li><li>02쪽 미완성 성과 표기와 06·19·22쪽 편집 지시를 정리합니다.</li><li>06쪽은 현재 활성 탭이 현장설명입니다. 사업관리 하위 메뉴라고 단정한 표기를 수정합니다.</li><li>10쪽 Before/After, 17쪽 적용 후, 21쪽 실제 적용 코드 명칭을 증거 범위에 맞춥니다.</li><li>23쪽 경고 상태·검색 중 라벨·동일한 Do/Don’t 설명을 고칩니다.</li><li>12·17쪽 식별 정보를 익명화하고 25쪽 테스트 데이터는 실제 앱에서 교체 후 재캡처합니다.</li><li>13쪽 날짜와 작업기간을 확인하고 26쪽 이메일·웹 링크를 구분합니다.</li></ol><h3>좋아진 구성은 유지합니다</h3><p>통합 플랫폼→TBM→ERP→공통 UI 순서, 07쪽 번호 대응, 08쪽 대안 비교, ERP 미사용·인트라넷 미배포 표기를 유지합니다. 24쪽 결재선 오타 수정과 25쪽 작업 생성 캡션 수정도 확인했습니다.</p><p class="notice">현재 폴더는 PNG 26장입니다. 이번 검토는 페이지 내용과 배치에 대한 검토이며 실제 서비스 동작·최종 PDF 링크·특허·성과 지표를 독립 검증한 결과는 아닙니다. 수정 HTML은 설명용 초안입니다.</p><h3>현재 공개 채용 문서에서 참고한 기준</h3><p>2026-10-10에 읽을 수 있었던 공고를 참고했습니다. 공고 게시일과 모집 지속 여부는 확정하지 않았으며 국내 채용시장 전체를 일반화하지 않습니다.</p><ul>'''+''.join(f'<li><a href="{E(u)}">{E(t)}</a> · {E(d)}</li>' for t,u,d in SOURCES)+'''</ul><h3>증거를 더하면 설득력이 커지는 부분</h3><table><thead><tr><th>페이지</th><th>추가할 실제 자료</th><th>현재 쓸 수 있는 설명</th></tr></thead><tbody><tr><td>10·15</td><td>실제 요청·제약·본인 선택·변경 화면 한 건</td><td>협업 범위, 배포와 실제 사용</td></tr><tr><td>19</td><td>동일 ERP의 전달 자료</td><td>UI 기준과 퍼블리싱 범위</td></tr><tr><td>21</td><td>토큰을 참조한 스타일과 적용 UI</td><td>컬러 변수 정의와 웹 가이드</td></tr><tr><td>22</td><td>기본/적용 UI와 변경 치수·이유</td><td>입력 상태 가이드와 일부 요소 사용 경험</td></tr></tbody></table><h3>페이지별 원고 바로 보기</h3><nav class="index" aria-label="검토 페이지 목차">'''+''.join(f'<a href="#p-{p["n"]:02}">{p["n"]:02} {E(p["group"])}</a>' for p in P)+'''</nav></section>'''
sections=[]
for p in P:
 n=p['n'];blocks=''.join('<div class="copy-block"><h4>'+E(b['title'])+'</h4><p>'+E(b['text'])+'</p></div>' for b in p['blocks'])
 sections.append(f'<section class="page-review" id="p-{n:02}" data-group="{E(p["group"])}" data-priority="{E(p["priority"])}"><h2><span class="badge '+('must' if p['priority']=='필수' else '')+f'">{E(p["priority"])}</span>{n:02} · {E(p["group"])} · {E(p["title"].replace(chr(10)," "))}</h2><div class="pair"><figure class="original"><a href="source/{n:02}.png" target="_blank" rel="noopener"><img src="source/{n:02}.png" loading="lazy" width="1920" height="1080" alt="1010 현재 원본 {n:02}쪽"></a><figcaption>현재 원본 {n:02}쪽 · 클릭하면 원본 크기로 보기</figcaption><details><summary>현재 제목·설명 보기</summary><p><strong>제목</strong> {E(p["current"])}</p><p><strong>제목 아래</strong> {E(p["old_desc"])}</p></details></figure><div><div class="copy"><h3>교체 원고</h3><p class="new-title">{E(p["title"])}</p><p class="new-desc">{E(p["desc"])}</p>{blocks}<button class="copy-btn" data-copy="{n}">이 페이지 원고 복사</button> <a href="1010_수정원고_레이아웃.html#page-{n:02}">레이아웃 초안 보기</a><p class="status" aria-live="polite"></p></div><div class="edit-note"><h3>검토 이유와 남은 수정</h3><ul>'+''.join('<li>'+E(i)+'</li>' for i in p['issues'])+f'</ul><div class="layout"><strong>배치 수정</strong><p>{E(p["layout"])}</p></div><div class="interview"><strong>면접관이 물을 질문</strong><p>{E(p["question"])}</p></div></div></div></div></section>')
# Clipboard supports both modern browser and local-file fallback. All content remains static without JS.
report_js='''const data=DATA;const sections=[...document.querySelectorAll('.page-review')],search=document.querySelector('#search'),group=document.querySelector('#group'),priority=document.querySelector('#priority');function filter(){const q=search.value.trim().toLowerCase();let count=0;sections.forEach(s=>{const shown=(!q||s.textContent.toLowerCase().includes(q))&&(!group.value||s.dataset.group===group.value)&&(!priority.value||s.dataset.priority===priority.value);s.hidden=!shown;if(shown)count++;});document.querySelector('#count').textContent=count+' / 26쪽 표시';}search.oninput=filter;group.onchange=filter;priority.onchange=filter;document.querySelector('#reset').onclick=()=>{search.value='';group.value='';priority.value='';filter()};document.querySelectorAll('.copy-btn').forEach(b=>b.onclick=async()=>{const p=data.find(p=>p.n===Number(b.dataset.copy));const text=p.title+'\\n\\n'+p.desc+'\\n\\n'+p.blocks.map(b=>b.title+'\\n'+b.text).join('\\n\\n');const status=b.parentElement.querySelector('.status');try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(text);else{const field=document.createElement('textarea');field.value=text;field.style.cssText='position:fixed;left:-9999px';document.body.append(field);field.select();const ok=document.execCommand('copy');field.remove();if(!ok)throw Error('copy');}status.textContent='수정 원고를 복사했습니다.';}catch{status.textContent='브라우저에서 복사를 허용하지 않았습니다. 수정 원고를 선택해 복사하세요.';}});document.querySelectorAll('.index a').forEach(a=>a.onclick=()=>{search.value='';group.value='';priority.value='';filter()});filter();'''.replace('DATA',json.dumps(P,ensure_ascii=False).replace('</','<\\/'))
groups=''.join('<option>'+E(g)+'</option>' for g in dict.fromkeys(p['group'] for p in P))
(ROOT/'1010_원본과수정안.html').write_text('<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>1010 포트폴리오 · 원본과 수정안</title><link rel="stylesheet" href="fonts/fonts.css"><style>'+report_css+'</style></head><body><header class="hero"><h1>1010 포트폴리오 · 26쪽 재검토와 교체 원고</h1><p>실제 새 원본 01–26쪽을 기준으로 제목·설명·화면·상태를 맞췄습니다. 각 페이지에서 원본, 바로 붙여 넣을 수정 문구, 수정 이유, 배치 지시, 면접 질문을 함께 확인할 수 있습니다.</p><div class="links"><a href="1010_수정원고_레이아웃.html">26쪽 수정 레이아웃</a><a href="1010_재검토_텍스트수정안.md">텍스트 수정안 파일</a><a href="#overview">전체 판단</a></div></header><nav class="controls" aria-label="페이지 검색과 필터"><label>검색<input id="search" type="search" placeholder="번호·설명·수정 내용"></label><label>프로젝트<select id="group"><option value="">전체</option>'+groups+'</select></label><label>수정 우선순위<select id="priority"><option value="">전체</option><option>필수</option><option>중요</option><option>보완</option></select></label><button id="reset">필터 초기화</button><span id="count" class="status" aria-live="polite"></span></nav><main class="content">'+summary+''.join(sections)+'<section class="summary"><h2>최종 확인 범위</h2><p>원본 26쪽은 모두 직접 확인했습니다. 폴더의 원본을 보존하고 복사본의 SHA-256을 대조했습니다. 수정 HTML의 페이지·이미지·링크·글자 넘침 점검은 validation.json에 기록합니다. 원본 디자인 수정, 실제 사용자 테스트, 최종 제출 PDF 점검은 별도의 작업입니다.</p><p>제출본을 편집할 때 검토 이유와 면접 질문은 참고만 하고 교체 원고와 증거 화면을 사용하세요. 원자료 보강·익명화·날짜 확인·시연 데이터 재캡처가 필요한 쪽은 페이지별 메모를 확인하세요.</p></section></main><script>'+report_js+'</script></body></html>')
# Make deck height depend on actual text, so two-line headings keep images within the page.
deck=ROOT/'1010_수정원고_레이아웃.html';s=deck.read_text()
s=s.replace("wrap.querySelector('.slide').style.transform='scale('+s+')';", "const slide=wrap.querySelector('.slide');slide.style.transform='scale('+s+')';const main=slide.querySelector('.slide-main'),foot=slide.querySelector('footer'),note=slide.querySelector('.evidence-note');main.style.height=(foot.offsetTop-main.offsetTop-(note?note.offsetHeight+16:0)-28)+'px';slide.querySelectorAll('.visuals img').forEach(img=>{img.style.maxHeight=Math.max(80,main.clientHeight-110)+'px';});")
s=s.replace('</style>', '.slide>header{margin-bottom:26px}.slide h1{font-size:52px;line-height:1.35;margin-bottom:18px}.slide .desc{font-size:29px;line-height:1.55;margin-bottom:26px}.slide.n-23 .visuals img{max-height:75px!important}.slide.n-23 .visuals figure:last-child img{max-height:140px!important}</style>')
s=s.replace('<input id="all" type="checkbox" checked>', '<input id="all" type="checkbox">')
# Resize hidden pages only after they are shown; a deep link opens exactly that page.
deck.write_text(s)
(ROOT/'README.md').write_text('''# 1010 포트폴리오 재검토 결과

1. `1010_원본과수정안.html`을 브라우저로 열어 전체 판단과 페이지별 수정 이유를 확인합니다.
2. `1010_재검토_텍스트수정안.md`의 교체 원고를 원본 디자인에 적용합니다.
3. `1010_수정원고_레이아웃.html`에서 문구와 UI를 배치한 26쪽 초안을 봅니다. 전체 보기/페이지 선택/인쇄를 지원합니다.

초안은 2026.10 설명용 재구성입니다. 원본 PNG와 실제 앱은 수정하지 않았습니다. 12·17쪽은 식별 정보를 담은 원자료 대신 항목 요약을 넣었습니다. 자료 보강·날짜 확인·시연 데이터 재캡처는 본문에 표시한 후속 작업입니다.

ZIP을 풀 때 폴더 구조를 유지하면 이미지·폰트·링크가 함께 열립니다. 외부 배포는 수행하지 않았습니다.

`source`: 수정하지 않은 1010 원본 26장. `evidence`: 실제 UI 부분 확대. `revision-data.json`: 페이지별 원고. `source-manifest.json`: 원본 해시. `crop-manifest.json`: 부분 확대의 원본과 좌표. `validation.json`: 생성 HTML 기술 점검 결과.
''')
print('comparison HTML and README built')
import re
s=deck.read_text()
for n in [18,19]:
 pattern=rf'(<div class="viewport" id="page-{n:02}">)(.*?)(?=<div class="viewport"|<script>)'
 m=re.search(pattern,s,re.S);assert m
 section=m.group(2)
 if n==18:
  last='<article class="copy-card"><h2>'+E(P[17]['blocks'][3]['title'])+'</h2><p>'+E(P[17]['blocks'][3]['text'])+'</p></article>'
  section=section.replace(last,'').replace('<footer>','<p class="evidence-note">조건 설정 → 주요 수치·현황 요약 → 프로젝트·인원별 상세</p><footer>')
 else:
  cards=[]
  for i,b in enumerate(P[18]['blocks']):
   imgs=''.join('<img src="evidence/'+k+'.png" alt="'+E(alts[k])+'">' for k in ['erp-menu','erp-sum']) if i==0 else ''
   cards.append('<article class="copy-card"><h2>'+E(b['title'])+'</h2>'+imgs+'<p>'+E(b['text'])+'</p></article>')
  section=re.sub(r'<main class="slide-main .*?</main>','<main class="slide-main cards-only">'+''.join(cards)+'</main>',section,flags=re.S)
 s=s[:m.start(2)]+section+s[m.end(2):]
s=s.replace('</style>', '''.toolbar label{min-width:0;max-width:100%}.toolbar select{min-width:0;max-width:100%}.toolbar label:has(select){flex:1 1 600px}.copy-card{padding:20px 24px}.copy-card h2{font-size:28px;line-height:1.4}.copy-card p{font-size:26px;line-height:1.5}.slide.n-3 .slide-main.cards-only{gap:20px}.slide.n-3 .copy-card{min-height:0;padding:17px 22px}.slide.n-3 .copy-card:last-child{grid-column:1/-1}.slide.n-3 .copy-card h2{font-size:27px}.slide.n-3 .copy-card p{font-size:25px}.slide.n-19 .slide-main.cards-only{grid-template-columns:repeat(3,1fr)}.slide.n-19 .copy-card{min-height:0}.slide.n-19 .copy-card img{display:block;max-width:100%;max-height:145px;margin:10px auto;object-fit:contain}.slide.n-19 .copy-card img:nth-of-type(2){max-height:110px}</style>''')
deck.write_text(s)
for name,y in [('search-default',413),('search-focus',495),('search-typing',579),('search-disabled',663)]: crops[name]=(23,214,y,341,61)
(ROOT/'crop-manifest.json').write_text(json.dumps(crops,ensure_ascii=False,indent=2))
print('slide fit refinements applied')
