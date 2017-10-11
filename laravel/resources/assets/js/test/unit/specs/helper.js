export const testAction = (action, payload, state, expectedMutations, done) => {
    let count = 0

    // コミットをモックする
    const commit = (type, payload) => {
        const mutation = expectedMutations[count]

        try {
            expect(mutation.type).to.equal(type)
            if (payload) {
                expect(mutation.payload).to.deep.equal(payload)
            }
        } catch (error) {
            done(error)
        }

        count++
        if (count >= expectedMutations.length) {
            done()
        }
    }

    // モック化したストアと引数でアクションを呼び出す
    action({ commit, state }, payload)

    // 呼び出されるべきミューテーションが残っていないか確認する
    if (expectedMutations.length === 0) {
        expect(count).to.equal(0)
        done()
    }
}
