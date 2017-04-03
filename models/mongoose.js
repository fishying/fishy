import mongoose from 'mongoose'

import plugins from '../lib/util/plugin'
import deep from 'mongoose-deep-populate'
let deepPopulate = deep(mongoose)

plugins(mongoose)

mongoose.plugin(deepPopulate)
mongoose.Promise = global.Promise

export default mongoose