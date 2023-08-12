<template lang="">
<h3 class="order-modal-title">Order now</h3>
    <form class="order-form" id="order-form">
      <label for="name" class="order-form-label">Name</label>
      <input type="text"   id="name" name="name" placeholder="Enter your name"
        class="order-form-input name-form-valid  input-js" required pattern="^[A-Za-zА-Яа-яЁёІіЇїЄє\s]+$">

      <label for="phone" class="order-form-label">Phone number</label>
      <input type="tel" id="phone" class="order-form-input phone-form-valid input-js" name="phone" pattern="^\+\d+$"
        required placeholder="Enter your phone">

      <label for="email" class="order-form-label">Email</label>
      <input type="email" id="email" name="email" placeholder="Enter your email"
        class="order-form-input email-form-valid  input-js" required>

      <label for="comment" class="order-form-label">Comment</label>
      <textarea id="comment" name="comment" class="order-form-comment"></textarea>

      <button type="submit" class="submit-btn" disabled>Send</button>
    </form>
</template>
<script>
export default {
    name: "HeroModal"
}
</script>
<style lang="scss">
    .backdrop.is-hidden .modal{
  transform: scale(0.75) translate(-65%, -65%);
  opacity: 0;
  transition-delay: 0ms;
}


.order-modal-title{
  color: var(--black);
  font-size: 18px;
  font-family: Inter;
  font-weight: 600;
  line-height: 22px;
  text-transform: uppercase;
  margin-bottom: 28px;
  @media screen and (min-width: 768px) {
    margin-bottom: 40px;
  }
}

.order-form-label{
  color:var(--gray-title-w);
  font-size: 14px;
  font-family: Inter;
  font-weight: 500;
  line-height: 18px;
}

.order-form{
  max-width: 360px;
  display: flex;
  flex-direction:column;
}

.order-form-input{
  width: 295px;
  height: 46px;
  padding: 14px 18px;
  margin: 8px 0 16px;
  border-radius: 15px;
  outline: none;
  border: 1px solid var(--gray-title-w);
  &:hover, &:active {
    border: 1px solid var(--green);
  }
  @media screen and (min-width: 768px) {
    width: 360px;
    height: 48px;
    margin: 8px 0 18px;
  }
}

.order-form-comment{
  width: 295px;
  height: 100px;
  padding: 14px 169px 14px 18px;
  margin: 8px 0 40px;
  border-radius: 15px;
  outline: none;
  border: 1px solid var(--gray-title-w);
  resize: none;
  &:hover, &:active {
  border: 1px solid var(--green);}
  @media screen and (min-width: 768px) {
    width: 360px;
    margin: 8px 0 40px;
  }
}

.submit-btn{
  background-color: var(--green);
  color: var(--white-w);
  border-radius: 15px;
  padding: 14px 28px;
  justify-content: center;
  align-items: center;
  transition: all var(--trns-general);
  &:hover {
    color: var(--black);
  }
  &:focus {
    color: var(--black);
  }
}


// NAME-VALID //

.name-form-valid:not(:placeholder-shown):required:valid {
  border-color: var(--green);
  transition: border-color var(--trns-modal);
}

.name-form-valid:not(:placeholder-shown):required:invalid {
  border-color: var(--color-input-red);
  transition: border-color var(--trns-modal);
}

// PHONE-VALID //

.phone-form-valid:not(:placeholder-shown):required:valid {
  border-color: var(--green);
  transition: border-color var(--trns-modal);
}

.phone-form-valid:not(:placeholder-shown):required:invalid {
  border-color: var(--color-input-red);
  transition: border-color var(--trns-modal);
}

// EMAIL-VALID //

.email-form-valid:not(:placeholder-shown):required:valid {
  border-color: var(--green);
  transition: border-color var(--trns-modal);
}

.email-form-valid:not(:placeholder-shown):required:invalid {
  border-color: var(--color-input-red);
  transition: border-color var(--trns-modal);
}
.submit-btn[disabled] {

  opacity: 0.6;
  cursor: not-allowed;
}
</style>