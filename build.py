import os
import json

CONTENT_DIR = "./content"

def build_study_data():
    if not os.path.exists(CONTENT_DIR):
        os.makedirs(CONTENT_DIR)
        print(f"📂 {CONTENT_DIR} 폴더가 생성되었습니다. 과목 폴더를 추가하세요.")
        return

    subjects = {}
    # content 폴더 내의 하위 폴더들 검색
    categories = [d for d in os.listdir(CONTENT_DIR) if os.path.isdir(os.path.join(CONTENT_DIR, d))]

    for category in categories:
        cat_dir = os.path.join(CONTENT_DIR, category)
        
        # 1. 메타데이터 읽기 (없으면 폴더명으로 자동 생성)
        meta_path = os.path.join(cat_dir, "meta.json")
        if os.path.exists(meta_path):
            with open(meta_path, 'r', encoding='utf-8') as f:
                meta = json.load(f)
        else:
            meta = {
                "title": f"📂 {category.upper()}",
                "desc": f"{category} 관련 학습 자료입니다.",
                "color": "indigo" # 기본 테마 색상
            }

        # 2. 마크다운 파일 목록 스캔
        files_data = []
        files = sorted(os.listdir(cat_dir))
        for file in files:
            if file.endswith('.md') and file != 'meta.json':
                label = os.path.splitext(file)[0].replace('_', ' ')
                files_data.append({
                    "label": f"📄 {label}",
                    "sub": f"content/{category}/{file}"
                })
        
        # 3. 파일이 있거나 메타가 있으면 등록
        if files_data or os.path.exists(meta_path):
            subjects[category] = {
                "meta": meta,
                "files": files_data
            }

    # data.js 출력
    with open('data.js', 'w', encoding='utf-8') as f:
        f.write("// 이 파일은 build.py에 의해 자동 생성됩니다. 직접 수정하지 마세요.\n")
        f.write("const AutoStudyData = ")
        json.dump(subjects, f, ensure_ascii=False, indent=4)
        f.write(";")
    
    print(f"✅ 총 {len(subjects)}개의 과목 메뉴가 생성되었습니다! 브라우저를 새로고침 하세요.")

if __name__ == "__main__":
    build_study_data()