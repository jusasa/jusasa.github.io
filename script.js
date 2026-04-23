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
                contentDiv.innerHTML = marked.parse(mdText);

                // 2. Mermaid 블록 찾기 및 변환
                const mermaidBlocks = contentDiv.querySelectorAll('pre code.language-mermaid');
                mermaidBlocks.forEach((block) => {
                    const pre = block.parentElement;
                    const code = block.textContent; // innerText 대신 textContent 사용
                    
                    // pre 태그를 mermaid 전용 div로 교체
                    const div = document.createElement('div');
                    div.className = 'mermaid-container flex justify-center my-8 w-full'; 
                    div.innerHTML = `<pre class="mermaid" style="background:transparent !important; border:none !important;">${code}</pre>`;
                    pre.replaceWith(div);
                });

                // 3. Mermaid 실행 (렌더링)
                if (window.mermaid) {
                    mermaid.run({
                        nodes: contentDiv.querySelectorAll('.mermaid'),
                    });
                }

                // 4. 일반 코드 하이라이팅 (mermaid 제외)
                contentDiv.querySelectorAll('pre code:not(.language-mermaid)').forEach((el) => {
                    if (typeof hljs !== 'undefined') hljs.highlightElement(el);
                });

                // 5. 기타 후처리
                contentDiv.classList.remove('fade-in'); 
                void contentDiv.offsetWidth; 
                contentDiv.classList.add('fade-in');
                if (window.MathJax) window.MathJax.typesetPromise();
            })
            .catch(err => {
                contentDiv.innerHTML = `<div class="py-20 text-center"><p class="text-rose-500 font-bold">⚠️ 에러: ${err}</p></div>`;
            });
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());