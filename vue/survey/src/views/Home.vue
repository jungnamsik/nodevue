<template>
  <section class="card blue-gradient wow fadeIn" id="intro">

      <!-- Content -->
      <div class="card-body text-white text-center py-5 px-5 my-5">

        <h1 class="mb-4">
          <strong>Survery Sysetm !!</strong>
        </h1>
        <p>
          <strong>Best &amp; free guide of responsive web design</strong>
        </p>
        <p class="mb-4">
          <strong>설문에 참여해주셔서 감사합니다, 여러분의 의견을 수렴하여 양질의 서비스를 제공하도록 최선을 다하겠습니다.</strong>
        </p>
        <div v-if="surveys.length">
          <div v-for="survey in surveys" :key="survey.id">
          <router-link :to="'/survey/'+survey.id" href="#" class="btn btn-outline-white btn-lg">
          {{survey.title}}
            <i class="fas fa-forward ml-2"></i>
          </router-link>
          </div>
        </div>
        <div v-else class="text-warning">! 오픈된 설문이 없습니다.</div>

      </div>
      <!-- Content -->
  </section>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home'
  , created() {
    let url = this.ApiURL + "surveys" ;
    console.log("url>>>> ", url);
    this.$http.get(url).then(ret => {
      if (ret.status != 200) {
        alert('Error on get Survey!!');
        console.log(ret) ;
        return ;
      }
      this.surveys = ret.data ;
    }) ;

  }
  , data() {
    return {
      surveys : [
        {id:1, title:"survey1"}, {id:2, title:"survey2"}
        ]
    }
  }
  ,methods : {
  }
}
</script>
