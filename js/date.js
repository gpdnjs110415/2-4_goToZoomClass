let days = ['일', '월', '화', '수', '목', '금', '토'];
let period = ['조회', '1교시', '2교시', '3교시', '4교시', '점심시간', '5교시', '6교시', '7교시', '종례', '자습'];
let teacher = ['김태', '이효', '장문', '이경', '함지', '김종', '정지', '장재', '조혜', '이재', '원미', '박경', '박성', '조혜', '', '김태', '김태', '김태', '', '', '김상'];
let zoomId = ['8134411742', '7987833794', '7965443330', '7126847915', '6863031340', '718015132', '7722593481', '7223454774', '3650046422', '7864104388', '5977904321', '3955689232', '3335559622', '3650046422', '', '8134411742', '8134411742', '8134411742', '', '7178015132'];
let subject = ['문학📕', '공업수학📊', '수학2🧮', '영어1📘', '응용프로그래밍 개발👨‍💻 / 정보보호 관리🔐', '화학1🧪', '중국어1👲', '성공적인 직업생활💼', '응용프로그래밍 화면구현💻', '운동과 건강🤸‍♀️', '정보보호 관리', '👩‍🎓진로👨‍🎓', '정보통신📲', '자료구조🤔', 'CA', 'HR', '', '', '', '', '물리'];

//2학기 시간표 ([요일][교시])
/*let timetable = [
    ['19', '19', '19', '19', '19', '19', '19', '19', '19', '19', '19'],
    ['16', '7', '5', '9', '4', '18', '4', '3', '12', '17', '19'],
    ['16', '13', '1', '7', '0', '18', '2', '11', '14', '17', '19'],
    ['16', '5', '8', '1', '2', '18', '6', '3', '17', '17', '19'],
    ['16', '8', '0', '9', '13', '18', '5', '11', '15', '17', '19'],
    ['16', '12', '4', '4', '1', '18', '6', '5', '17', '19'],
    ['19', '19', '19', '19', '19', '19', '19', '19', '19', '19', '19']
];*/

//1학기 시간표 ([요일][교시])
let timetable = [
    ['19', '19', '19', '19', '19', '19', '19', '19', '19', '19', '19'],
    ['19', '19', '19', '19', '19', '19', '19', '19', '19', '19', '19'],
    ['19', '19', '19', '19', '19', '19', '19', '19', '19', '19', '19'],
    ['19', '19', '19', '19', '19', '19', '19', '19', '19', '19', '19'],
    ['16', '8', '12', '3', '20', '18', '2', '4', '14', '17', '19'],
    ['16', '4', '2', '0', '13', '20', '9', '11', '17', '19'],
    ['19', '19', '19', '19', '19', '19', '19', '19', '19', '19', '19']
];

//zoom 링크
let zoom = 'https://zoom.us/j/' //zoom기본 링크

//김태철 0 이효현 1 장문석 2 이경은 3 함지연 4 김종수 5 정지훈 6 장재원 7 조혜연(응화) 8 이재민 9 원미경 10 박경수 11 박성수 12 자료구조 13 CA 14 HR 15 점심시간 18 김상욱 20


function getTimeInfo() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let day = days[today.getDay()];
    let hour = today.getHours();
    let minute = today.getMinutes();
    let second = today.getSeconds();

    //몇시?
    today = year + `년 ` + month + `월 ` + date + `일 ` + day + `요일`;
    document.getElementById('date').innerText = today;
    document.getElementById('now').innerText = hour + '시 ' + minute + '분 ' + second + '초';


    //몇교시?
    let time;
    if (hour == 8) {
        if (minute <= 54) {
            time = 0;
        } else {
            time = 1;
        }
    } else if (hour == 9) {
        if (minute >= 00 && minute <= 49) {
            time = 1;
        } else {
            time = 2;
        }
    } else if (hour == 10) {
        if (minute >= 00 && minute <= 49) {
            time = 2;
        } else {
            time = 3;
        }
    } else if (hour == 11) {
        if (minute >= 00 && minute <= 49) {
            time = 3;
        } else {
            time = 4;
        }
    } else if (hour == 12) {
        if (minute >= 00 && minute <= 49) {
            time = 4;
        } else {
            time = 5;
        }
    } else if (hour == 13) {
        if (minute >= 00 && minute <= 49) {
            time = 5;
        } else {
            time = 6;
        }
    } else if (hour == 14) {
        if (minute >= 00 && minute <= 39) {
            time = 6;
        } else {
            time = 7;
        }
    } else if (hour == 15) {
        if (minute >= 00 && minute <= 39) {
            time = 7;
        } else {
            time = 8;
        }
    } else if (hour == 16) {
        if (minute >= 00 && minute <= 39) {
            time = 8;
        } else {
            time = 9;
        }
    } else if (hour > 16 || hour < 8) {
        time = 10;
    }

    document.getElementById('time').innerText = period[time];

    //다음교시까지 남은 시간 체크
    if (time <= 4 && time > 0) {
        leftTime = 60 - minute;
    } else if (time > 4 && time < 10) {
        leftTime = 50 - minute;
    }
    if (hour == 12) {
        leftTime = 11;
    }
    //쉬는시간이면 남은시간 출력
    if (leftTime >= 0 && leftTime <= 10) {
        document.getElementById('leftTime').innerText = '다음 수업까지 ' + leftTime + '분 남았어요!';
    } else { document.getElementById('leftTime').innerText = '  '; }

    getZoom(time);
}
//subject[요일][교시]


//교시를 주면 링크를 가져옴
function getZoom(time) {
    let today = new Date();
    let day = today.getDay();
    console.log(day);
    timetableNow = timetable[day][time];
    console.log(timetableNow);
    document.getElementById('subject').innerText = subject[timetableNow];

    if (timetableNow == 4) {
        document.getElementById('teacher').innerText = '함지* T / 원미* T';
        document.getElementById('enterZoomBtn').innerHTML = '<div id="enterZoom"><a id="zoomLink" href="https://zoom.us/j/5977904321" target="_blank">응용프로그래밍 개발</a></div><div id="enterZoom" style="margin-top:1rem;"><a id="zoomLink" href="https://zoom.us/j/6863031340" target="_blank">정보보호 관리</a></div>'
    } else if (timetableNow == 14) {
        document.getElementById('teacher').innerText = teacher[timetableNow];
        document.getElementById('enterZoomBtn').innerHTML = '';
    } else if (timetableNow < 18 || timetableNow == 20) {
        document.getElementById('teacher').innerText = teacher[timetableNow] + '* T';
        document.getElementById('zoomLink').href = zoom + zoomId[timetableNow];
    } else if (timetableNow == 18) {
        document.getElementById('teacher').innerText = teacher[timetable[day][time + 1]] + '* T';
        document.getElementById('zoomLink').href = zoom + zoomId[timetable[day][time + 1]];
        document.getElementById('subject').innerText = subject[timetable[day][time + 1]] + '\n(5교시)';
        document.getElementById('subject').style.paddingTop = '1.2rem';
    } else {
        document.getElementById('teacher').innerText = teacher[timetableNow];
        document.getElementById('enterZoomBtn').innerHTML = '';
    }
}

function init() {
    getTimeInfo();
    setInterval(getTimeInfo, 1000);
}

init();