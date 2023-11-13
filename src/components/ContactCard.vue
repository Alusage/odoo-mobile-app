<template>
  <div>
    <h2>{{ contact.name }}</h2>
    <p> {{ contact.street }}</p>
    <p> {{ contact.street2 }}</p>
    <p> {{ contact.zip }}</p>
    <p> {{ contact.city }}</p>
    <p> {{ contact.phone }}</p>
    <p> {{ contact.email }}</p>

  </div>
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      required: true
    }
  }
}
</script>
