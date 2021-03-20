<template>
  <div class="setting-securitylog-container">
    <div class="securitylog-item-box">
      <BorderTitle :title="'Security log'" />
      <div class="securitylog-vertical-container">
        <LogCell
          v-for="(v, i) in logPaging.data"
          :key="`log-cell-${i}`"
          :log-model="v"
        />
      </div>
      <div class="pagination-box">
        <b-pagination
          v-model="logPaging.page"
          class="pagination"
          :total="logPaging.total"
          :per-page="logPaging.PER_PAGE"
          @change="fetch"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LogCell from '@/components/atoms/cell/LogCell.vue'
import { failureToast } from '@/scripts/utils/toast'
import { checkAuthWithStatus, AuthApi, AuthLogModel } from '@/scripts/api/index'
import { getTitle, PAGES } from '@/scripts/model/head/index'

type PagingModel = {
  data: AuthLogModel[]
  total: number
  page: number
  PER_PAGE: number
  isFetching: boolean
}

type DataType = {
  logPaging: PagingModel
}

export default Vue.extend({
  components: {
    LogCell,
  },
  data(): DataType {
    return {
      logPaging: {
        data: [] as AuthLogModel[],
        total: 0,
        page: 1,
        PER_PAGE: 15,
        isFetching: false,
      } as PagingModel,
    }
  },
  head: {
    title: getTitle(PAGES.SECURITY_LOG),
  },
  created() {
    this.fetch()
  },
  methods: {
    failureToast,
    checkAuthWithStatus,
    fetch() {
      const offset = (this.logPaging.page - 1) * this.logPaging.PER_PAGE
      new AuthApi(this.$store.getters['auth/config'])
        .getAuthLog(undefined, offset, this.logPaging.PER_PAGE)
        .then(res => {
          if (res.data.has_next) {
            this.logPaging.total = offset + this.logPaging.PER_PAGE * 2
          }
          this.logPaging.data = res.data.logs
        })
        .catch(err => {
          this.checkAuthWithStatus(this, err.response.status)
          this.failureToast(
            // @ts-ignore
            this.$buefy,
            'fetch security log failed',
            err.response.status
          )
        })
    },
  },
})
</script>

<style lang="scss">
.pagination-link {
  background-color: white;
}
</style>

<style lang="scss" scoped>
.setting-securitylog-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
  max-width: 798px;
  padding: 0px 16px;
  margin-bottom: 32px;
  color: white;
  background-color: rgb(32, 32, 32);
  font-size: 14px;
  font-weight: bold;

  .border-title {
    width: 100%;
    margin: 16px 0;
  }

  .securitylog-item-box {
    width: 100%;

    .maximum-width {
      max-width: 375px;
    }
    .update-button {
      width: 144px;
      margin: 16px 0;
      font-weight: bold;
    }
  }

  .pagination-box {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin: 16px 0;
  }

  .border-title {
    margin-bottom: 30px;
  }
}
</style>
