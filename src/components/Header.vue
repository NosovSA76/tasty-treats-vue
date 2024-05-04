<template >
    <div>
        <header class="header">
  <div class="container animate__animated animate__fadeInDown">
    <div class="header-items">
      <nav class="navigation">
      <router-link class="header-nav-links btn-home" to="/">Home</router-link>
      <router-link class="header-nav-links" to="/favorites">Favorites</router-link>
    </nav>
      <a href="/" class="logo-first">tasty<span class="logo-second">treats.</span></a>
      <div class="header-icons">
        <button  @click="modalShow" class="header-order-btn" aria-label="shopping btn" type="button" id="imitation">
          <svg class="shopping-icon order-btn" width="24" height="24">
            <use class="shopping-icon-use" href="@/assets/SPRITE.svg#icon-shopping-cart-03"></use>
          </svg>
        </button>
        <div>
          <label class="header-switch">
            <input type="checkbox">
            <span class="header-slider"></span>
          </label>
        </div>
        <button class="mob-menu-btn" type="button">
          <svg class="mobile-icon" width="32" height="32">
            <use class="mobile-menu-icon" href="@/assets/SPRITE.svg#icon-align-justify"></use>
          </svg>
        </button>
      </div>
    </div>
  </div>
  <div class="mobile-menu">
    <button class="mob-menu-btn-close" type="button">
      <svg class="mob-menu-close" width="32" height="32">
        <use class="mob-menu-close-icon" href="@/assets/SPRITE.svg#icon-x-mobile"></use>
      </svg>
    </button>
    <ul class="mob-menu-list">
      <li><a class="header-list-item" href="./index.html">Home</a></li>
      <li><a class="header-list-item" href="./favorites.html">Favorites</a></li>
    </ul>
    <div>
      <label class="switch">
        <input type="checkbox">
        <span class="slider"></span>
      </label>
    </div>
  </div>
</header>
    </div>
</template>
<script>
import store from "@/store/index";
export default {
    name: "Header",
    methods:{
    modalShow(){
      store.dispatch("setHeroModal",  true);
      console.log(store.state)
    },
  }
}
</script>
<style lang="scss">
    .header{
    padding-top: 24px;
    @media screen and (min-width: 768px) {
        padding-top: 28px;
    }
    @media screen and (min-width: 1280px) {
        padding-top: 40px;
    }
}
.navigation{
    display: none;
    @media screen and (min-width:768px) {
        display: inline;
        position: relative;
    }
}

.navigation a {
    position: relative;
}
.navigation a::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--green);
  transform: scaleX(0);
  transition: transform 0.3s ease-in-out;
}
.navigation a:hover::before,
.navigation a:focus::before {
  transform: scaleX(1);
}

.header-nav-links{
    color: var(--black);
    font-size: 12px;
    font-weight: 500;
    font-size: 12px;
    
}

.header-nav-links:hover,
.header-nav-links:focus{
    color: var(--green);
    transition: var(--trns-general);
}

.btn-home{
    margin-right: 16px;
}

.logo-first {
    color: var(--green);
    font-size: 16px;
    font-weight: 600;
    line-height: calc(18/16);
    letter-spacing: -0.64px;
    @media screen and (min-width:768px){
        font-size: 18px;
        line-height: calc(20/18);
        letter-spacing: -0.72px;
    }
}

.logo-second {
    color: var(--black);
    font-size: 16px;
    font-weight: 600;
    line-height: calc(18/16);
    letter-spacing: -0.64px;
    @media screen and (min-width:768px) {
        font-size: 18px;
        line-height: calc(20/18);
        letter-spacing: -0.72px;
    }
}

.header-items {
    display: flex;
    align-items: center;
    @media screen and (min-width:768px) {
        justify-content: space-between;
    }
}

.header-icons {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-left: auto;
    @media screen and (min-width:768px) {
        margin-left: 0;
    }
}

.header-order-btn{
    display: flex;
    align-items: center;
    justify-content: center;
}

.mob-menu-btn {
    border: none;
    padding: 0;
    margin: 0;
    @media screen and (min-width: 768px) {
        display: none;
    }
}

.mobile-menu-icon{
    stroke: var(--black);
}


.header-switch {
    display: none;
    @media screen and(min-width:768px) {
        position: relative;
        display: flex;
        width: 47px;
        height: 20px;
        border-radius: 10px;
        box-shadow: 7px 5px 15px 0px #A09EA066;
    }
  }
  
  .header-switch input {
    display: none;
  }
  
  .header-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--gray-radiobtn-w);
    transition: 0.4s;
    border-radius: 34px;
    box-shadow: 4px 4px 15px rgba(243, 243, 243, 0.25);
}

.header-slider:before {
    position: absolute;
    content: "";
    height: 17px;
    width: 17px;
    left: 2px;
    bottom: 2px;
    background-color: var(--background-w);
    transition: 0.4s; 
    border-radius: 50%;
  }
  
  .header-switch input:checked + .header-slider {
    background: linear-gradient(#9BB537, #9BB537);
    box-shadow: 4px 4px 15px rgba(243, 243, 243, 0.25);
  }
  
  .header-switch input:checked + .header-slider:before {
    box-shadow: 4px 4px 15px rgba(243, 243, 243, 0.25);
    transform: translateX(26px);
  }

/* Mobile Menu Styles */

.mobile-menu {
    background-color: var(--green);
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;

    @media screen and (min-width: 768px) {
        display: none;
    }
}

.mobile-menu.open {
    transform: translateX(0);
}

.mob-menu-btn-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
}
.mob-menu-btn-close .mob-menu-close {
    transition: transform 0.3s ease-in-out;
}
.mob-menu-btn-close:hover {
    transform: rotate(45deg);
}
.mob-menu-btn-close:hover .mob-menu-close {
    transform: scale(1.2);
}

.mob-menu-close-icon{
    stroke: white;
}

.mob-menu-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    padding-top: 200px;
    padding-bottom: 566px;
}

.header-list-item .main-page{
    color: var(--white-d);
    font-size: 12px;
    font-weight: 500;
    justify-content: center;
}

.header-list-item{
    color: var(--white-d);
    font-size: 12px;
    font-weight: 500;
    justify-content: center;
}

.active-header-list-item{
    color: var(--black);
}

.switch {
    position: absolute;
    width: 46px;
    height: 20px;
    bottom: 30px;
    left: 20px;
}

.switch input {
    display: none;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--gray-radiobtn-w);
    transition: 0.4s;
    border-radius: 34px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 15px;
    width: 15px;
    left: 4px;
    bottom: 3px;
    background-color: var(--background-w);
    transition: 0.4s;
    border-radius: 50%;
}

input:checked+.slider {
    background: var(--green);
}

input:checked+.slider:before {
    transform: translateX(26px);
    box-shadow: 4px 4px 15px rgba(243, 243, 243, 0.25);
}

.current::after{
    position: absolute;
    content: "";
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--green);
}

.nav-link-active{
    color: var(--green);
}

.shopping-icon-use{
    fill: var(--white-w);
    stroke: var(--black);
}

</style>