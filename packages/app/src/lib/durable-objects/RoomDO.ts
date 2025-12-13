import { env } from 'cloudflare:workers'
import { DurableObject } from 'cloudflare:workers'

export class RoomDO extends DurableObject<Env> {
  count = 0

  constructor(ctx: DurableObjectState) {
    super(ctx, env)

    ctx.blockConcurrencyWhile(async () => {
      this.count = (await this.ctx.storage.get('count')) || this.count
    })
  }

  async increment() {
    this.count++
    await this.ctx.storage.put('count', this.count)
  }

  async getCount() {
    return this.count++
  }
}
