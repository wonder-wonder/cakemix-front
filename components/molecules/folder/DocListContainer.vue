<template>
  <div>
    <div class="title" v-text="'Document'" />
    <div class="list-container">
      <Document
        v-for="(model, index) in models"
        :key="`D${index}${uuid}`"
        :document-model="model"
        @click.native="goToDoc(model.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { v4 as uuidv4 } from 'uuid'
import Document from '@/components/atoms/folder/Document.vue'

@Component({
  components: {
    Document,
  },
})
export default class FolderListContainer extends Vue {
  uuid: string = uuidv4()

  @Prop({
    default: [{}],
  })
  models!: [{}]

  goToDoc(documentId: string) {
    this.$router.push({ path: `/doc/${documentId}` })
  }
}
</script>

<style lang="scss">
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 16px auto;
  padding: 8px 32px;
  border-radius: 8px;
  color: white;
  font-size: 24px;

  &:before,
  &:after {
    content: '';
    flex-grow: 1;
    height: 1px;
    background: grey;
    display: block;
  }
  &:before {
    margin-right: 16px;
  }
  &:after {
    margin-left: 16px;
  }
}

.list-container {
  display: flex;
  flex-flow: row wrap;
  margin: 16px;

  .document-box {
    margin: 16px 0 0 16px;
  }
}
</style>
