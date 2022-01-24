from pythclient.pythclient import PythClient
from pythclient.pythaccounts import PythPriceAccount
from pythclient.utils import get_key
import asyncio
import sys
import pandas as pd
use_program = len(sys.argv) >= 2 and sys.argv[1] == "program"
solana_network="devnet"
attr_list = []
async def get_data_pyth():
    while True:
        async with PythClient(
            first_mapping_account_key=get_key(solana_network, "mapping"),
            program_key=get_key(solana_network, "program") if use_program else None,
        ) as c:
            await c.refresh_all_prices()
            products = await c.get_products()
            df = pd.DataFrame(columns=["Market","Value","Confidence"])
            for p in products:
                attr_list.append(p.attrs)
                prices = await p.get_prices()
                for _, pr in prices.items():
                    l= [
                        pr.product.symbol,
                        pr.aggregate_price,
                        pr.aggregate_price_confidence_interval
                    ]
                    df.loc[len(df)]=l

            df.to_csv("out.csv", index=False)

print("Starting pyth data stream.")
loop = asyncio.get_event_loop()
asyncio.ensure_future(get_data_pyth())
loop.run_forever()
