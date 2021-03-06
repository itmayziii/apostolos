#!/usr/bin/env node

import * as yargs from 'yargs'
import { tagCommand } from './commands/tag-command'
import { tagTarbalUrlCommand } from './commands/tag-tarbal-url-command'
import { tagTarbalDownloadCommand } from './commands/tag-tarbal-download-command'
import { tarbalCommand } from './commands/tarbal-command'
import { githubAuthMiddleware } from './middleware/github-auth-middleware'
import { templateCommand } from './commands/template-command'

const argv: yargs.Arguments = yargs
    .usage('Usage: $0 <command> [options]')
    .command(tagCommand)
    .command(tagTarbalUrlCommand)
    .command(tagTarbalDownloadCommand)
    .command(tarbalCommand)
    .command(templateCommand)
    .middleware([
      githubAuthMiddleware
    ])
    .config('c', 'Config file path')
    .nargs('c', 1)
    .alias('c', 'config')
    .string('c')
    .default('c', 'apostolos-config.json')
    .help('h')
    .alias('h', 'help')
    .argv
