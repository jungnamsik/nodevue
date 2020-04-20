<template>
    <section>
        <div class="row" style="border:1px solid red">
            <div class="col-5">
                <div class="list-group">
                    <div v-for="survey in surveys" :key="survey.id">

                    <router-link :to="'/surveylist/surveyedit/'+survey.id" 
                    href="#"
                    class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        {{survey.title}}
                        <span class="badge badge-primary badge-pill" >{{surveyCode[survey.state]}}</span>
                    </router-link>
                    </div>

                </div>
            </div>
            <div class="col-7">
                <router-view></router-view>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    created() {
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