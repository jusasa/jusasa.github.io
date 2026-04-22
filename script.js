const App = {
    state: { page: 'home', sub: {} },
    config: {
        home: { title: '<span class="text-indigo-500">Study</span> Hub', nav: [{ label: '🏠 홈 (자료 모음)', target: 'home' }] }
    },

    init() {
        // 코드 컬러링(Highlight.js) 설정
        marked.setOptions({
            highlight: function(code, lang) {
                if (typeof hljs !== 'undefined') {
                    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                    return hljs.highlight(code, { language }).value;
                }
                return code;
            },
            langPrefix: 'hljs language-'
        });

        const homeGrid = document.getElementById('home-grid');
        if (homeGrid) homeGrid.innerHTML = '';

        // 🎯 AutoStudyData를 기반으로 UI 자동 생성
        if (typeof AutoStudyData !== 'undefined') {
            for (const [catId, catData] of Object.entries(AutoStudyData)) {
                
                // 1. 사이드바 설정 자동 생성
                const color = catData.meta.color || 'indigo';
                this.config[catId] = {
                    title: `<span class="text-${color}-500 font-bold">${catData.meta.title}</span>`,
                    nav: [
                        { label: '← 홈으로 돌아가기', target: 'home' },
                        ...catData.files
                    ]
                };

                // 2. 홈 화면 버튼 자동 생성
                if (homeGrid) {
                    const btn = document.createElement('button');
                    btn.onclick = () => this.navigate(catId);
                    btn.className = `text-left bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 hover:border-${color}-500 hover:-translate-y-1 transition-all group flex flex-col justify-between`;
                    btn.innerHTML = `
                        <div>
                            <h3 class="text-xl font-bold mb-2">${catData.meta.title}</h3>
                            <p class="text-slate-600 dark:text-slate-400 text-sm">${catData.meta.desc}</p>
                        </div>
                    `;
                    homeGrid.appendChild(btn);
                }
            }
        }
        this.navigate('home');
    },

    navigate(pageId) {
        this.state.page = pageId;
        document.querySelectorAll('.page-view').forEach(el => el.classList.add('hidden'));
        
        if(pageId === 'home') {
            document.getElementById('page-home').classList.remove('hidden');
        } else {
            document.getElementById('page-viewer').classList.remove('hidden');
            if(!this.state.sub[pageId] && this.config[pageId].nav[1]) {
                this.state.sub[pageId] = this.config[pageId].nav[1].sub; // 첫번째 문서 자동 열기
            }
            this.updateSubView();
        }
        this.renderSidebar();
    },

    setSub(subId) {
        this.state.sub[this.state.page] = subId;
        this.renderSidebar();
        this.updateSubView();
    },

    renderSidebar() {
        const conf = this.config[this.state.page];
        document.getElementById('sidebar-header').innerHTML = `<h1 class="text-2xl font-bold text-white truncate">${conf.title}</h1>`;
        
        let html = '', mobHtml = '';
        if (this.state.page !== 'home') mobHtml += `<option value="go-home">← 홈으로 돌아가기</option>`;

        conf.nav.forEach(n => {
            const isActive = (n.target === this.state.page) || (n.sub === this.state.sub[this.state.page]);
            const cls = isActive ? 'bg-slate-800 text-white font-bold border-l-4 border-indigo-500' : 'text-slate-400 hover:bg-slate-800 hover:text-white border-l-4 border-transparent';
            const act = n.target ? `App.navigate('${n.target}')` : `App.setSub('${n.sub}')`;
            
            html += `<li><button onclick="${act}" class="w-full text-left px-6 py-3 text-sm transition-colors ${cls}">${n.label}</button></li>`;
            if (n.sub) mobHtml += `<option value="${n.sub}" ${isActive ? 'selected' : ''}>${n.label}</option>`;
        });

        document.getElementById('sidebar-nav').innerHTML = html;
        const mobNav = document.getElementById('mobile-nav');
        if (this.state.page === 'home') mobNav.classList.add('hidden');
        else {
            mobNav.classList.remove('hidden');
            mobNav.innerHTML = mobHtml;
            mobNav.onchange = (e) => e.target.value === 'go-home' ? App.navigate('home') : App.setSub(e.target.value);
        }
    },

    updateSubView() {
        const p = this.state.page;
        const s = this.state.sub[p];
        const contentDiv = document.getElementById('md-content');
        
        if (!s) return;

        document.getElementById('viewer-title').innerText = this.config[p].nav.find(n => n.sub === s)?.label || '문서 보기';
        contentDiv.innerHTML = '<div class="py-20 text-center text-slate-500"><div class="animate-pulse">데이터를 불러오는 중입니다...</div></div>';
        
        fetch(s)
            .then(res => res.ok ? res.text() : Promise.reject('파일을 찾을 수 없습니다: ' + s))
            .then(mdText => {
                // 🎯 꼬였던 에러 완벽 해결 구간
                if (!mdText) {
                    contentDiv.innerHTML = "내용이 비어있는 파일입니다.";
                    return;
                }

                let rawHtml = marked.parse(mdText);

                // 문제지 자동 채점기 파싱
                if (p === 'problems') {
                    const container = document.createElement('div');
                    container.innerHTML = rawHtml;
                    
                    let currentQ = 0;
                    let isAnswerSection = false;
                    const answerSectionDiv = document.createElement('div');
                    answerSectionDiv.id = "answer-section";
                    answerSectionDiv.className = "hidden mt-12 p-8 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-600";
                    const newContentDiv = document.createElement('div');

                    Array.from(container.childNodes).forEach(node => {
                        if (node.nodeName.match(/^H[1-2]$/) && node.textContent.match(/정답|해설|답/)) isAnswerSection = true;
                        if (isAnswerSection) { answerSectionDiv.appendChild(node); return; }
                        if (node.nodeName.match(/^H[2-4]$/) && node.textContent.match(/^\s*(\d+)\./)) currentQ = node.textContent.match(/^\s*(\d+)\./)[1];

                        if (node.innerHTML && node.innerHTML.match(/(①|②|③|④|⑤)/)) {
                            let html = node.innerHTML.replace(/(①|②|③|④|⑤)\s*([\s\S]*?)(?=(?:①|②|③|④|⑤|<br|$))/g, (match, num, text) => {
                                return `<label class="block p-3 my-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg cursor-pointer transition-all flex items-start gap-3">
                                            <input type="radio" name="q${currentQ}" value="${num}" class="mt-1 w-4 h-4 text-indigo-600"> 
                                            <span><strong class="text-indigo-500">${num}</strong> ${text.trim()}</span>
                                        </label>`;
                            });
                            if (node.nodeName === 'PRE') {
                                const div = document.createElement('div'); div.innerHTML = html; newContentDiv.appendChild(div);
                            } else { node.innerHTML = html; newContentDiv.appendChild(node); }
                            return; 
                        }

                        newContentDiv.appendChild(node);
                        if (node.nodeName === 'BLOCKQUOTE' && currentQ > 0) {
                            const textarea = document.createElement('textarea');
                            textarea.className = "w-full mt-4 p-4 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 outline-none text-sm";
                            textarea.rows = node.textContent.length > 50 ? 6 : 2;
                            textarea.placeholder = "정답 작성...";
                            newContentDiv.appendChild(textarea);
                        }
                    });

                    const gradeBtn = document.createElement('button');
                    gradeBtn.className = "mt-12 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg";
                    gradeBtn.innerHTML = "✅ 채점하기";
                    
                    gradeBtn.onclick = () => {
                        const answerKey = {};
                        const ansRegex = /(\d+)(?:\.|번|:|\s)?\s*\**([①②③④⑤])/g;
                        let match;
                        while ((match = ansRegex.exec(answerSectionDiv.textContent)) !== null) answerKey[match[1]] = match[2];

                        let score = 0;
                        for(let q in answerKey) {
                            const selected = document.querySelector(`input[name="q${q}"]:checked`);
                            document.querySelectorAll(`input[name="q${q}"]`).forEach(opt => {
                                const label = opt.parentElement;
                                if(opt.value === answerKey[q]) label.classList.add('bg-green-100', 'border', 'border-green-500');
                                else if (opt.checked) label.classList.add('bg-rose-100', 'border', 'border-rose-500');
                                opt.disabled = true;
                            });
                            if(selected && selected.value === answerKey[q]) score++;
                        }
                        gradeBtn.classList.add('hidden');
                        answerSectionDiv.classList.remove('hidden');
                        
                        const scoreUI = document.createElement('div');
                        scoreUI.className = "mb-8 p-6 bg-indigo-50 border border-indigo-200 rounded-xl text-center";
                        scoreUI.innerHTML = `<h3 class="text-2xl font-bold">결과: ${Object.keys(answerKey).length}문제 중 ${score}개 정답</h3>`;
                        answerSectionDiv.prepend(scoreUI);
                        window.scrollTo({ top: answerSectionDiv.offsetTop - 80, behavior: 'smooth' });
                    };

                    newContentDiv.appendChild(gradeBtn);
                    newContentDiv.appendChild(answerSectionDiv);
                    contentDiv.innerHTML = '';
                    contentDiv.appendChild(newContentDiv);

                } else {
                    // 일반 마크다운 파싱 렌더링
                    contentDiv.innerHTML = rawHtml;
                }
                
                // 🎯 신택스 하이라이팅 적용
                contentDiv.querySelectorAll('pre code').forEach((el) => {
                    if (typeof hljs !== 'undefined') hljs.highlightElement(el);
                });

                contentDiv.classList.remove('fade-in'); void contentDiv.offsetWidth; contentDiv.classList.add('fade-in');
                if (window.MathJax) window.MathJax.typesetPromise();
            })
            .catch(err => {
                contentDiv.innerHTML = `<div class="py-20 text-center"><p class="text-rose-500 font-bold">⚠️ 문서를 로드할 수 없습니다.</p><p class="text-sm text-slate-500 mt-2">${err}</p></div>`;
            });
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());