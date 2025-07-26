import dns from "dns/promises"

const dnsMatcher = async (domain: string, expectedValue: string) => {
    const records = await dns.resolveTxt(domain)
    const flatRecords = records.flat().map(r => r.toString())

    const matched = flatRecords.some(record => record === expectedValue)

    if (!matched) {
        throw new Error("TXT verification failed")
    }

    return true
}

export default dnsMatcher;