<template>
  <div>
    <header />
    <viewer />
  </div>
</template>

<script>
import Header from '@/components/organisms/document/Header'
import Viewer from '@/components/molecules/document/Viewer'

export default {
  name: 'Document',

  components: {
    Header,
    Viewer,
  },
}
</script>
