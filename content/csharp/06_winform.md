### WinFroms

#### WinFroms란?

* C#에서 GUI를 만들기 위한 프레임워크
* Event driven program

#### 기본 구조

* Form : 윈도우
* Control : 폼에 올리는 컨트롤

    - 이벤트 종류
        - 사용자 이벤트 (클릭, 드래그, 키입력...)
        - 시스템 이벤트 (메모리 load, 폼 닫기...) -> 이름이 정해져 있음

    - 공용컨트롤
        - Label (레이블)
            - 속성
                |주요속성|설명|
                |:-:|-:|
                |Text|텍스트 내용|
                |AutoSize|자동 크기 조절|
                |Font|글꼴|
            ```cs
            label1.Text = "Hi~"
            ```
        - TextBox (텍스트 입력)
            - 속성
                |주요속성|설명|
                |:-:|-:|
                |Text|입력된 값|
                |Multiline|여러 줄 입력 가능|
                |PasswordChar|비번 표시|
            ```cs
            string input = texxBox1.Text;
            ```
        - Button (버튼)
            - 이벤트
                - Clcik
            ```cs
            private void button1_Click(object sender, EventArgs e) {
                MessageBox.Show("Hello~!")
            }
            ```
        - CheckBox (체크박스)
            - 주요 속성: `Checked`
        ```cs
        if (checkBox1.Checked)
        {
            MessageBox.Show("True");
        }
        else
        {
            MessageBox.Show("False");
        }
        ```
        - RadioButton (여려개중 하나 선택)
            - 특징: 같은 그룹에서 하나만 선택
            ```cs
            if (radioButton1.Checked)
            { 
                MessageBox.Show("True1");
            }
            else if (radioButton2.Checked)
            { 
                MessageBox.Show("True2");
            }
            else if (radioButton3.Checked)
            { 
                MessageBox.Show("True3");
            }
            else
            { 
                MessageBox.Show("False");
            }
            ```
        - ComboBox (드롭다운 목록)
            - 주요 속성
                |주요속성|설명|
                |:-:|-:|
                |Items|항목 목록|
                |SelectedItem|선택된 항목|
                |SelectedIndex|선택된 항목의 인덱스|
            ```cs
            comboBox1.Items.Add(value); // 항목 추가
            comboBox1.Items.Add(value2);
            string selected =
                comboBox1
                .SelectedItem
                .ToString();
            ```
        
        - ListBox (목록 표시)
            ```cs
            listBox1.Items.Add(value1);
            listBox1.Items.Add(value2);

            string item = 
                listBox1
                .SelectedItem
                .ToString();
            ```
        - PictureBox (그림 표시)
            - 속성:
                |속성|설명|
                |:-:|-:|
                |Image|이미지|
                |ImageLocation|이미지 경로|
                |SizeMode|이미지 크기 조절|
            
            ```cs
            pb.Image = Image.FromFile(@"path");
            ```
        
        - DateTimePicker (날짜 선택)
            - 주요 속성
                |속성|설명|
                |:-:|-:|
                |Value|선택된 날짜|
                |Format|날짜 형식|
            ```cs
            DateTime date = 
                dateTimePicker1
                .Value;
            string s = date.ToString("yyyy-mm-dd");
            ```
        
        - ProgressBar (진행바)
            - 주요 속성
                |속성|설명|
                |:-:|-:|
                |Value|진행률|
                |Maximum|최대값|
                |Minimum|최소값|
            ```cs
            progressBar1.Value += 50;
            ```

        - NumericUpDown (숫자 입력 /증감버튼 포함)
            - 주요 속성
                |속성|설명|
                |:-:|-:|
                |Value|값|
                |Maximum|최대값|
                |Minimum|최소값|
            ```cs
            int num = (int)numericUpDown.Value;
            ```
        - RichTextBox (서식 있는 텍스트 편집)
            - 주요 기능
                - 글자 색 변경
                - 폰트 변경
            ```cs
            richTextBox1.Text = 
                "서식 있는 텍스트";
            ```
        - ListView (목록 표시)
            - 속성:
                |속성|설명|
                |:-:|-:|
                |View|표시 형식|
                |Columns|열 제목|
                |Items|항목 목록|
            ```cs
            listView1.View = 
                View.Details;
            listView1.Columns.Add("이름");
            listView1.Columns.Add("나이");
            ListViewItem item = 
                new ListViewItem("홍길동");
            item.SubItems.Add("30");
            listView1.Items.Add(item);
            ```
        - TreeView (계층 구조)
            - 주요 속성:
                |속성|설명|
                |:-:|-:|
                |Nodes|노드 목록|
                |SelectedNode|선택된 노드|
            ```cs
            TreeNode root = new TreeNode("루트");
            root.Nodes.Add("자식1");
            root.Nodes.Add("자식2");
            root.Nodes.Add("자식3");
            treeView1.Nodes.Add(root);
            
            ```
