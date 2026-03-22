import { useRouter } from "vue-router";

export function useNavigator(){
    const router = useRouter()

    const goToRoot = ()=>{router.push('/')}
    const goToFather = ()=>{router.push({name:"Father"})}
    const goToCalculator = () => {router.push({name:"Calculator"})}
    const goToProxy = () => {router.push({ name:"Proxy" })}
    const goToVisualScroll = () => {router.push({ name: "VisualScrollTest" })}
    return { goToCalculator, goToFather, goToRoot, goToProxy, goToVisualScroll }
}