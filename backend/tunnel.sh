#!/bin/bash

LOCAL_PORT=2000

cloudflared tunnel --url http://localhost:$LOCAL_PORT
