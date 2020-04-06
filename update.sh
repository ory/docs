function update {
    git clone git@github.com:ory/$1.git tmp/$1 ||true
    cd tmp/$1

    git town main-branch $3
    git checkout $3
    git reset --hard HEAD
    git hack docusaurus-$(date +"%m-%d-%y-%H-%M-%S")

    cp -R ../../. doc/
    rm doc/package-lock.json
    npm run i
    rm doc/update.sh

    git add -A || true
    git commit -a -s -m "docs: update docusaurus template" || true
    git npr || true

    cd ../..
}

update oathkeeper
update keto
update hydra
update kratos
