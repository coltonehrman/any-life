```
[user@server ~]$ sudo su
[admin@server]# rm -rf any-life-app/^C
[admin@server]# pm2 stop all
[PM2] Applying action stopProcessId on app [all](ids: [ 0 ])
[PM2] [app](0) ✓
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ app                │ fork     │ 0    │ stopped   │ 0%       │ 0b       │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
[admin@server]# rm -rf any-life-app/
[admin@server]# cd any-life-app/
[admin@server]# rm -rf node_modules/
[admin@server]# npm i

added 403 packages, and audited 404 packages in 5s

101 packages are looking for funding
  run `npm fund` for details

3 high severity vulnerabilities

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
[root@ip-172-31-50-180 any-life-app]# npm run build

> any-life-io@1.0.0 build
> tsc && tailwindcss -i ./public/main.css -o ./public/app.css


Rebuilding...

Done in 435ms.
[admin@server]# pm2 start dist/app.js 
[PM2] Applying action restartProcessId on app [app](ids: [ 0 ])
[PM2] [app](0) ✓
[PM2] Process successfully started
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ app                │ fork     │ 0    │ online    │ 0%       │ 19.2mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```