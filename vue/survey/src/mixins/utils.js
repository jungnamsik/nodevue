export const utils = { 
    methods: { 
      surveyStateName(s) {
        if (!s)
        return "준비중";
      else if (s == "0") {return "준비중";}
      else if (s == "1") {return "오픈";}
      else if (s == "8") {return "종료";}
      else if (s == "9") {return "삭제";}
      }
    }
    ,data() {
      return {
        surveyCode : {
          "0":"준비중"
         ,"1":"오픈"
         ,"8":"종료"
         ,"9":"삭제"
       }
      }
    }
  }