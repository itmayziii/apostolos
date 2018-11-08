#!/usr/bin/env node

import * as yargs from 'yargs'
import { tagCommand, tagBuilder } from './commands/tag'
import { tagTarbalUrlBuilder, tagTarbalUrlCommand } from './commands/tag-tarbal-url'

const argv = yargs
    .usage('Usage: $0 <command> [options]')
    .command('tag', 'Get the latest tag from a repository', tagBuilder, tagCommand)
    .command('tag-tarbal-url', 'Determine Github tarbal URL from tag name', tagTarbalUrlBuilder, tagTarbalUrlCommand)
    .help('h')
    .alias('h', 'help')
    .argv
