import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class VaultsService {
  async getVaults() {
    try {
      const res = await api.get('api/vaults')
      AppState.vaults = res.data
      logger.log('getallvaults', res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async getOneVault(id) {
    try {
      const res = await api.get('api/vaults/' + id)
      AppState.activevault = res.data
      logger.log('getallvaults', res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async getVaultsById(profileId) {
    try {
      const res = await api.get('api/profiles/' + profileId + '/vaults')
      AppState.myvaults = res.data
      logger.log('from getvaultsbyid', res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async createVault(newVault) {
    try {
      const res = await api.post('api/vaults', newVault)
      AppState.vaults = res.data
      this.getVaults()
    } catch (error) {
      logger.error(error)
    }
  }

  async removeVault(id) {
    try {
      await api.delete('api/vaults' + id)
    } catch (error) {
      logger.error(error)
    }
  }

  async addVaultKeep(vaultId, KeepId) {
    try {
      const newVaultKeep = {
        vaultId: vaultId,
        keepId: KeepId
      }
      logger.log(newVaultKeep)
      await api.post('api/vaultkeeps', newVaultKeep)
    } catch (error) {
      logger.errror(error)
    }
  }

  async getVaultKeeps(id) {
    try {
      const res = await api.get('api/vaults/' + id + ('/keeps'))
      AppState.vaultKeeps = res.data
      logger.log(AppState.vaultKeeps)
    } catch (error) {
      logger.error(error)
    }
  }

  async removeKeepFromVault(id) {
    try {
      await api.delete('api/vaultkeeps/' + id)
      logger.log('Deleted Keep From VaultKeep')
    } catch (error) {
      logger.error(error)
    }
  }
}
export const vaultsService = new VaultsService()
