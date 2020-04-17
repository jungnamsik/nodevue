<template>
    <section  class="container ">
        <div v-if="!EventBus.isAdmin">
            <div class="md-form w-75">
                <i class="fa fa-key prefix"></i>
                <input type="password" id="adminkey" v-model="adminkey" class="form-control">
                <label for="adminkey">Admin Key</label>

            </div>

        </div>
        <!-- <div style="border: 1px solid red;"> -->
        <div>
            <!-- <span style="font-size:50px">Admin Page ~~~~~!!!!</span> -->
            <h1>Admin Page ~~~aa~~!!! !</h1>
        </div>
    </section>
    <!-- <section class="container mt-5 pt-5">
        Admin Page ~~~~~!!!!
    </section> -->
</template>

<script>
export default {
    beforeCreate () {
        if (this.EventBus.isAdmin) {
            this.$router.replace('/surveylist') ;
        }
    }

    , created () {
        this.$watch('adminkey', this._.debounce(this.checkAdminKey, 3000))

    }
    , data () {
        return {
            adminkey : null
        }
    }
    , methods : {
        checkAdminKey() {
            let url = this.ApiURL + 'adminkey' ;
            console.log('admin url>>', url) ;
            this.$http.post(url, {key: this.adminkey}).then (ret => {
                if (ret.status === 200) {
                    this.EventBus.isAdmin = true ;
                    this.$router.push('/surveylist');

                }
            }) ;
        }
    }

}
</script>