```bash
docker run -d --rm \
-v ./pwd.txt:/p.txt \ 
-v ./datos:/data ethereum/client-go:1.13.15 \
--datadir /data \
--unlock 832e22b5e5930ca372ef89c737ec8485eb11c007 \
--allow-insecure-unlock \
--mine \
--miner.etherbase 832e22b5e5930ca372ef89c737ec8485eb11c007 \
--password /p.txt \
--nodiscover \
--http \
--http.addr "0.0.0.0" \
--http.api "admin,eth, debug,miner,net,txpool,personal,web3" \
--http.corsdomain "*" 
```