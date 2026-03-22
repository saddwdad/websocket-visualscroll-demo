    export function useNavigator2(){

        return {
            goToRoot2(){
                this.$router.push('/')
            },
            goToFather2(){
                this.$router.push({name:"Father"})
            },
            goToCalculator2(){
                this.$router.push({name:"Calculator"})
            }
        }
    }